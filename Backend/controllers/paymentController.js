import razorpay from "../config/razorpay.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

// Local fallback database writer to prevent crash if MongoDB Atlas fails/blocks IP
const saveToFallbackFile = async (data) => {
  try {
    const fallbackPath = path.join(process.cwd(), "payments_fallback.json");
    let payments = [];
    try {
      const fileData = await fs.readFile(fallbackPath, "utf-8");
      payments = JSON.parse(fileData);
    } catch (readError) {
      // File doesn't exist yet, which is expected
    }

    const existingIndex = payments.findIndex(p => p.razorpay_order_id === data.razorpay_order_id);
    if (existingIndex !== -1) {
      payments[existingIndex] = { ...payments[existingIndex], ...data };
    } else {
      payments.push(data);
    }

    await fs.writeFile(fallbackPath, JSON.stringify(payments, null, 2), "utf-8");
    console.log("💾 Successfully logged payment to local JSON fallback database.");
  } catch (err) {
    console.error("❌ Failed to write local JSON fallback:", err.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing amount"
      });
    }

    const options = {
      amount: Math.round(amount * 100), // in paise (Rupees * 100)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const isConnected = mongoose.connection.readyState === 1;
    const pendingData = {
      amount: amount,
      razorpay_order_id: order.id,
      status: "Pending",
      timestamp: new Date()
    };

    if (isConnected) {
      try {
        const pendingPayment = new Payment(pendingData);
        await pendingPayment.save();
        console.log("💾 Created pending order in MongoDB.");
      } catch (dbError) {
        console.error("⚠️ Failed to write pending order to MongoDB, falling back to local storage:", dbError.message);
        await saveToFallbackFile(pendingData);
      }
    } else {
      console.log("⚠️ MongoDB not connected. Saving pending order to local fallback.");
      await saveToFallbackFile(pendingData);
    }

    res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      customerEmail,
      items,
      phone,
      address,
      deliveryFee,
      tax,
      subtotal,
      amount
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const isConnected = mongoose.connection.readyState === 1;
      const paymentDetails = {
        customerName,
        customerEmail,
        amount: amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "Paid",
        timestamp: new Date(),
        items,
        phone,
        address,
        deliveryFee,
        tax,
        subtotal
      };

      if (isConnected) {
        try {
          const payment = await Payment.findOne({ razorpay_order_id });
          if (payment) {
            payment.customerName = customerName;
            payment.customerEmail = customerEmail;
            payment.razorpay_payment_id = razorpay_payment_id;
            payment.razorpay_signature = razorpay_signature;
            payment.status = "Paid";
            payment.items = items;
            payment.phone = phone;
            payment.address = address;
            payment.deliveryFee = deliveryFee;
            payment.tax = tax;
            payment.subtotal = subtotal;
            payment.amount = amount || payment.amount;
            await payment.save();
            console.log("💾 Updated payment to Paid in MongoDB.");
          } else {
            const newPayment = new Payment(paymentDetails);
            await newPayment.save();
            console.log("💾 Created new Paid payment in MongoDB.");
          }
        } catch (dbError) {
          console.error("⚠️ Failed to write verified payment to MongoDB, using local fallback:", dbError.message);
          await saveToFallbackFile(paymentDetails);
        }
      } else {
        console.log("⚠️ MongoDB disconnected. Saving verified payment to local fallback.");
        await saveToFallbackFile(paymentDetails);
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature, verification failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};