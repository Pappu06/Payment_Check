import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const orderDetails = location.state || null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-white border border-neutral-100 rounded-3xl p-8 md:p-10 w-full max-w-xl shadow-xl relative z-10 text-center flex flex-col items-center">
        {/* Animated Checkmark Icon */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 mb-6 text-emerald-500 animate-bounce">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 className="font-display font-black text-3xl text-neutral-900 mb-2 leading-tight">
          Order Placed Successfully!
        </h1>
        
        <p className="text-neutral-500 text-sm mb-8 max-w-sm leading-relaxed">
          Your payment has been verified. Delicious food will arrive at your doorstep in approximately 30 minutes!
        </p>

        {orderDetails ? (
          <div className="w-full space-y-6 text-left">
            {/* Items Summary Card */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
              <h3 className="font-display font-bold text-neutral-800 text-sm mb-3.5 uppercase tracking-wider">
                Order Summary
              </h3>
              <div className="divide-y divide-neutral-200">
                {orderDetails.items?.map((item) => (
                  <div key={item.id} className="flex justify-between py-2.5 text-xs">
                    <span className="text-neutral-600">
                      {item.name} <span className="font-bold text-neutral-900">x{item.quantity}</span>
                    </span>
                    <span className="font-bold text-neutral-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-3.5 mt-2 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal:</span>
                  <span>₹{orderDetails.subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Delivery Fee:</span>
                  <span>{orderDetails.deliveryFee === 0 ? "FREE" : `₹${orderDetails.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>GST (5%):</span>
                  <span>₹{orderDetails.tax}</span>
                </div>
                <div className="flex justify-between text-neutral-900 font-display font-extrabold text-sm pt-1 border-t border-neutral-100">
                  <span>Total Amount Paid:</span>
                  <span className="text-orange-500">₹{orderDetails.amount}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
              <h3 className="font-display font-bold text-neutral-800 text-sm mb-3.5 uppercase tracking-wider">
                Delivery Details
              </h3>
              <div className="space-y-2.5 text-xs text-neutral-600">
                <div>
                  <span className="font-bold text-neutral-500 block mb-0.5">Recipient Name:</span>
                  <span className="text-neutral-800 font-medium">{orderDetails.customerName}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-500 block mb-0.5">Email Address:</span>
                  <span className="text-neutral-800 font-medium">{orderDetails.customerEmail}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-500 block mb-0.5">Phone Number:</span>
                  <span className="text-neutral-800 font-medium">{orderDetails.phone}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-500 block mb-0.5">Delivery Address:</span>
                  <span className="text-neutral-800 font-medium whitespace-pre-wrap">{orderDetails.address}</span>
                </div>
              </div>
            </div>

            {/* Transaction metadata */}
            <div className="bg-orange-50/40 border border-orange-100 rounded-2xl p-4 text-[10px] text-neutral-500 space-y-1">
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="text-emerald-600 font-bold">PAID (SUCCESS)</span>
              </div>
              <div className="flex justify-between">
                <span>Razorpay Order ID:</span>
                <span className="font-semibold text-neutral-700">{orderDetails.razorpay_order_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Razorpay Payment ID:</span>
                <span className="font-semibold text-neutral-700">{orderDetails.razorpay_payment_id}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-5 mb-6 text-left text-xs text-neutral-500">
            <p className="text-center font-medium py-4">No order details found. The transaction details were saved successfully.</p>
          </div>
        )}

        <Link
          to="/"
          className="w-full mt-8 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Success;