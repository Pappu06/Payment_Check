import { createOrder, verifyPayment } from "../services/paymentService";
import { useState } from "react";

function PaymentButton({ customerName, customerEmail, validateForm }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            // 1. Create order on backend
            const data = await createOrder();
            if (!data.success) {
                throw new Error(data.message || "Failed to create order");
            }

            // 2. Setup Razorpay options
            const options = {
                key: data.key_id,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "PaySphere",
                description: "React Payment Course",
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        setLoading(true);
                        // 3. Verify signature on backend
                        const verificationResult = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            customerName,
                            customerEmail,
                        });

                        if (verificationResult.success) {
                            window.location.href = "/payment-success";
                        } else {
                            window.location.href = "/payment-failed";
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        window.location.href = "/payment-failed";
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: customerName,
                    email: customerEmail,
                },
                theme: {
                    color: "#6366f1", // Indigo 500
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                console.error("Payment failed:", response.error);
                window.location.href = "/payment-failed";
            });
            
            rzp.open();

        } catch (error) {
            console.error("Payment initialization failed:", error);
            alert(error.message || "Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </>
            ) : (
                "Pay Now"
            )}
        </button>
    );
}

export default PaymentButton;