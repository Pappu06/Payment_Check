import { useState } from "react";
import PaymentButton from "./PaymentButton";

function ProductCard() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!customerName.trim()) {
      tempErrors.customerName = "Name is required";
    }
    if (!customerEmail.trim()) {
      tempErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      tempErrors.customerEmail = "Invalid email format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-indigo-500/5 hover:border-slate-700">
      
      {/* Decorative gradient blur */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="mb-6">
        <span className="text-xs px-3 py-1 rounded-full font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Best Seller
        </span>
      </div>

      <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
        React Payment Course
      </h2>

      <p className="text-slate-400 mt-2.5 text-sm leading-relaxed">
        Master end-to-end Razorpay gateway integration, signature validation, and database storage with this premium developer course.
      </p>

      <div className="flex items-baseline gap-2 mt-6">
        <span className="font-display text-5xl font-black text-white">₹499</span>
        <span className="text-sm text-slate-500 line-through">₹2,499</span>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 ml-2">
          80% OFF
        </span>
      </div>

      <div className="h-[1px] bg-slate-700/50 my-6"></div>

      {/* Feature list */}
      <ul className="space-y-3.5 text-sm text-slate-300">
        <li className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
          <span>Immediate Lifetime access</span>
        </li>
        <li className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
          <span>Verified Certificate of Completion</span>
        </li>
        <li className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
          <span>Complete Source Code & Setup Guide</span>
        </li>
      </ul>

      <div className="h-[1px] bg-slate-700/50 my-6"></div>

      {/* Checkout Form */}
      <div className="space-y-4">
        <h3 className="font-display text-sm font-semibold text-slate-200 tracking-wide uppercase">
          Billing Details
        </h3>
        
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-400 mb-1.5">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Jane Doe"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              if (errors.customerName) setErrors(prev => ({ ...prev, customerName: "" }));
            }}
            className={`w-full bg-slate-900/60 border ${errors.customerName ? 'border-rose-500/80 focus:ring-rose-500/20' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-4 transition-all duration-200`}
          />
          {errors.customerName && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
              ⚠ {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="emailAddress" className="block text-xs font-semibold text-slate-400 mb-1.5">
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            placeholder="jane.doe@example.com"
            value={customerEmail}
            onChange={(e) => {
              setCustomerEmail(e.target.value);
              if (errors.customerEmail) setErrors(prev => ({ ...prev, customerEmail: "" }));
            }}
            className={`w-full bg-slate-900/60 border ${errors.customerEmail ? 'border-rose-500/80 focus:ring-rose-500/20' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-4 transition-all duration-200`}
          />
          {errors.customerEmail && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
              ⚠ {errors.customerEmail}
            </p>
          )}
        </div>
      </div>

      <PaymentButton
        customerName={customerName}
        customerEmail={customerEmail}
        validateForm={validateForm}
      />

    </div>
  );
}

export default ProductCard;