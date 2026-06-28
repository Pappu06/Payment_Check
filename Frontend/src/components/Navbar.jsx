import { useCart } from "../App";

function Navbar() {
  const { cartCount, setCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100 py-4 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-display font-extrabold text-white text-xl">Y</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-neutral-800">
            Yummy<span className="text-orange-500">.</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-semibold text-neutral-600 hover:text-orange-500 transition-colors duration-200">Home</a>
          <a href="#menu" className="text-sm font-semibold text-neutral-600 hover:text-orange-500 transition-colors duration-200">Menu</a>
          <a href="#about" className="text-sm font-semibold text-neutral-600 hover:text-orange-500 transition-colors duration-200">About Us</a>
          <a href="#testimonials" className="text-sm font-semibold text-neutral-600 hover:text-orange-500 transition-colors duration-200">Reviews</a>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-bold bg-orange-50 text-orange-600 border border-orange-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Sandbox Mode
          </span>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 rounded-xl border border-neutral-100 hover:border-orange-200 bg-neutral-50 hover:bg-orange-50 text-neutral-600 hover:text-orange-600 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;