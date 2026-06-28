import { useState } from "react";
import { useCart } from "../App";
import { createOrder, verifyPayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  // Cost calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + tax;

  const validateForm = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = "Name is required";
    if (!customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phone.trim().length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
    }
    if (!address.trim()) newErrors.address = "Delivery address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // 1. Create order on backend
      const data = await createOrder(grandTotal);
      if (!data.success) {
        throw new Error(data.message || "Failed to create Razorpay order");
      }

      // 2. Setup Razorpay options
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Yummy. Food Delivery",
        description: "Food order payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            setLoading(true);
            // 3. Verify signature on backend & save full details
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerName,
              customerEmail,
              phone,
              address,
              items: cart.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                image: i.image
              })),
              deliveryFee,
              tax,
              subtotal,
              amount: grandTotal
            });

            if (verificationResult.success) {
              clearCart();
              setCartOpen(false);
              navigate("/payment-success", {
                state: {
                  customerName,
                  customerEmail,
                  phone,
                  address,
                  items: cart,
                  subtotal,
                  deliveryFee,
                  tax,
                  amount: grandTotal,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id
                }
              });
            } else {
              navigate("/payment-failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            navigate("/payment-failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: phone,
        },
        theme: {
          color: "#f97316", // Orange-500
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (res) {
        console.error("Payment failed:", res.error);
        navigate("/payment-failed");
      });
      
      rzp.open();

    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert(error.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={() => !loading && setCartOpen(false)}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-in-out">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                <h2 className="font-display font-bold text-xl text-neutral-800" id="slide-over-title">
                  Your Order Cart
                </h2>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setCartOpen(false)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 transition duration-150 disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4 animate-pulse">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <h3 className="font-display font-bold text-lg text-neutral-800 mb-1">Your cart is empty</h3>
                    <p className="text-neutral-500 text-sm max-w-xs mb-6">Add delicious meals from our popular dishes menu to checkout.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm shadow-md transition duration-200 cursor-pointer"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Items List */}
                    <div className="divide-y divide-neutral-100">
                      {cart.map((item) => (
                        <div key={item.id} className="flex py-4 items-center gap-4">
                          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-contain bg-neutral-50 p-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-semibold text-neutral-800 text-sm truncate">{item.name}</h4>
                            <p className="text-orange-500 font-bold text-sm mt-0.5">₹{item.price}</p>
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-neutral-200 rounded-full py-1 px-2.5 gap-2">
                            <button
                              disabled={loading}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-neutral-500 hover:text-orange-500 font-bold text-sm h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-neutral-800 w-4 text-center">{item.quantity}</span>
                            <button
                              disabled={loading}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-neutral-500 hover:text-orange-500 font-bold text-sm h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          {/* Remove Button */}
                          <button
                            disabled={loading}
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500 p-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Checkout Details Form */}
                    <div className="border-t border-neutral-100 pt-6">
                      <h3 className="font-display font-bold text-neutral-800 text-base mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Delivery Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Full Name</label>
                          <input
                            type="text"
                            disabled={loading}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors duration-200 ${errors.customerName ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-orange-500"}`}
                          />
                          {errors.customerName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customerName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Email Address</label>
                          <input
                            type="email"
                            disabled={loading}
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors duration-200 ${errors.customerEmail ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-orange-500"}`}
                          />
                          {errors.customerEmail && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customerEmail}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Phone Number</label>
                          <input
                            type="tel"
                            disabled={loading}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9876543210"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors duration-200 ${errors.phone ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-orange-500"}`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Delivery Address</label>
                          <textarea
                            disabled={loading}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Flat/House no., Street, Area details..."
                            rows="2"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors duration-200 resize-none ${errors.address ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-orange-500"}`}
                          />
                          {errors.address && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.address}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout Action */}
              {cart.length > 0 && (
                <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-6 space-y-4">
                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-neutral-800">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        <span className="font-bold text-neutral-800">₹{deliveryFee}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (GST 5%):</span>
                      <span className="font-bold text-neutral-800">₹{tax}</span>
                    </div>
                    {subtotal <= 500 && (
                      <p className="text-[10px] text-orange-500 font-semibold text-center mt-1">
                        💡 Add ₹{500 - subtotal} more for Free Delivery!
                      </p>
                    )}
                    <div className="border-t border-neutral-200 pt-2.5 mt-2 flex justify-between text-neutral-900 font-display font-extrabold text-base">
                      <span>Total Amount:</span>
                      <span className="text-orange-500">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 disabled:from-neutral-300 disabled:to-neutral-400 text-neutral-900 hover:text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all duration-300 transform active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying order...
                      </>
                    ) : (
                      <>
                        Pay & Order Now (₹{grandTotal})
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
