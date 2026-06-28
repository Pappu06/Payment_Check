import { Link } from "react-router-dom";

function Failed() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800 flex flex-col justify-center items-center px-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-rose-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-white border border-neutral-100 rounded-3xl p-8 md:p-10 w-full max-w-md shadow-xl relative z-10 text-center flex flex-col items-center">
        {/* Warning Icon Container */}
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 mb-6 text-rose-500">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
          </svg>
        </div>

        <h1 className="font-display font-black text-3xl text-neutral-900 mb-2">
          Payment Failed
        </h1>
        
        <p className="text-neutral-500 text-sm mb-6 max-w-xs leading-relaxed">
          The transaction could not be completed. Your funds were not charged, or will be refunded if debited.
        </p>

        <div className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-5 mb-8 text-left space-y-3 text-xs text-neutral-500 font-medium">
          <span className="font-display block text-neutral-700 text-xs font-bold uppercase tracking-wide">Common Issues to Check:</span>
          <ul className="space-y-2 list-disc list-inside">
            <li>Declined by bank or insufficient card limit</li>
            <li>Incorrect OTP / 3D secure authentication</li>
            <li>Closed Razorpay checkout window before payment finished</li>
          </ul>
        </div>

        <Link
          to="/"
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-neutral-900 hover:text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          Try Payment Again
        </Link>
      </div>
    </div>
  );
}

export default Failed;