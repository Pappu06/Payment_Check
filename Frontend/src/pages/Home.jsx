import { useState } from "react";
import { useCart } from "../App";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import CartDrawer from "../components/CartDrawer";

// Category items matching the category icons in the design
const CATEGORIES = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "Burger", name: "Burger", icon: "🍔" },
  { id: "Pizza", name: "Pizza", icon: "🍕" },
  { id: "Pasta", name: "Pasta", icon: "🍝" },
  { id: "Salad", name: "Salad", icon: "🥗" },
  { id: "Dessert", name: "Desserts", icon: "🍰" },
  { id: "Drink", name: "Drinks", icon: "🍹" },
];

// Popular dishes from the design
const POPULAR_DISHES = [
  {
    id: "burger-01",
    name: "Cheese Burger",
    price: 249,
    rating: 4.8,
    reviews: 120,
    image: "/dish_burger.png",
    category: "Burger",
  },
  {
    id: "pizza-01",
    name: "Pepperoni Pizza",
    price: 399,
    rating: 4.7,
    reviews: 98,
    image: "/dish_pizza.png",
    category: "Pizza",
  },
  {
    id: "pasta-01",
    name: "Creamy Alfredo Pasta",
    price: 299,
    rating: 4.9,
    reviews: 132,
    image: "/dish_pasta.png",
    category: "Pasta",
  },
  {
    id: "salad-01",
    name: "Chicken Caesar Salad",
    price: 199,
    rating: 4.6,
    reviews: 76,
    image: "/dish_salad.png",
    category: "Salad",
  },
];

// Why choose us items
const WHY_CHOOSE_US = [
  {
    title: "Fast Delivery",
    desc: "Quick delivery to your doorstep",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Best Quality",
    desc: "Fresh ingredients, always",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Easy Payments",
    desc: "Multiple secure payment options",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "We're here to help you anytime",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

// Testimonials matching the design reviews
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    text: "The food was amazing and delivered on time. Highly recommended! Service has been fantastic consistently.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Food Blogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    text: "Great variety of dishes and excellent customer service. Will order again! The quality of ingredients is superb.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Local Guide",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
    text: "Fresh, tasty and delivered hot! Yummy is my go-to food delivery app. The interface is clean and checkout is easy.",
    rating: 5,
  },
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { setCartOpen } = useCart();

  // Filter popular dishes based on selected category
  const filteredDishes = selectedCategory === "all"
    ? POPULAR_DISHES
    : POPULAR_DISHES.filter(dish => dish.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800 relative overflow-hidden flex flex-col font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 relative z-10 w-full">
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="grid md:grid-cols-12 gap-12 items-center py-8 md:py-16">
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-neutral-900 leading-[1.1] mb-6">
              Good food, <br />
              good <span className="text-orange-500 font-serif italic tracking-wide font-black">mood</span>
            </h1>
            <p className="text-neutral-500 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Discover delicious meals from top restaurants delivered to your doorstep. Satisfy your cravings in a few taps.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center mb-12">
              <button
                onClick={() => setCartOpen(true)}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-600/35 transition-all duration-300 transform hover:scale-[1.03] flex items-center gap-3 cursor-pointer"
              >
                <span>Order Now</span>
                <span className="bg-white text-orange-500 rounded-full p-1.5 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
              
              <a
                href="#menu"
                className="px-7 py-4 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 hover:text-neutral-900 font-bold rounded-full shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Menu</span>
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </a>
            </div>

            {/* Badges / Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-8 max-w-lg">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🏪</span>
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm md:text-base leading-none">500+</h4>
                  <span className="text-neutral-400 text-[10px] md:text-xs">Restaurants</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm md:text-base leading-none">30 mins</h4>
                  <span className="text-neutral-400 text-[10px] md:text-xs">Fast Delivery</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🥇</span>
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm md:text-base leading-none">100%</h4>
                  <span className="text-neutral-400 text-[10px] md:text-xs">Best Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Plate */}
          <div className="md:col-span-5 flex justify-center relative">
            {/* Background pasta accent ring */}
            <div className="absolute w-[110%] h-[110%] bg-amber-400/10 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
            
            {/* Main Plate */}
            <div className="relative max-w-[380px] md:max-w-full drop-shadow-2xl z-10 transition-transform duration-500 hover:rotate-6">
              <img
                src="/pasta_hero.png"
                alt="Delicious Pasta"
                className="w-full h-auto object-contain rounded-full"
              />
              
              {/* Floating Leaf / Tomato Elements */}
              <span className="absolute top-[10%] left-[5%] text-3xl animate-bounce pointer-events-none filter drop-shadow">🍃</span>
              <span className="absolute bottom-[20%] left-[-5%] text-4xl animate-bounce pointer-events-none filter drop-shadow [animation-delay:0.7s]">🍅</span>
              <span className="absolute top-[40%] right-[-8%] text-3xl animate-bounce pointer-events-none filter drop-shadow [animation-delay:1.2s]">🍃</span>

              {/* Hot Deal Overlay Card */}
              <div className="absolute right-[-10px] bottom-[20px] bg-white rounded-3xl p-5 shadow-xl border border-neutral-100/70 max-w-[170px] z-20 hover:scale-105 transition duration-300">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2.5">
                  🔥 Hot Deal
                </span>
                <h4 className="font-display font-extrabold text-neutral-800 text-sm leading-tight mb-3">
                  Get 20% OFF on your first order
                </h4>
                <button
                  onClick={() => setCartOpen(true)}
                  className="w-full py-2 bg-amber-400 hover:bg-orange-500 text-neutral-900 hover:text-white font-bold text-xs rounded-xl shadow-sm transition duration-200 cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES SECTION ================= */}
        <section id="categories" className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-900">
              Categories
            </h2>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 cursor-pointer transition duration-150"
            >
              <span>View All</span>
              <span className="text-[10px]">▶</span>
            </button>
          </div>

          {/* Scrollable Categories List */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-3 py-5 px-6 rounded-3xl border min-w-[100px] transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-white border-amber-400 shadow-md shadow-amber-400/10 -translate-y-1"
                    : "bg-white border-neutral-100 hover:border-neutral-200 hover:-translate-y-0.5"
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition duration-300 ${
                  selectedCategory === category.id ? "bg-amber-400/20" : "bg-neutral-50"
                }`}>
                  {category.icon}
                </div>
                <span className={`text-xs font-bold transition duration-200 ${
                  selectedCategory === category.id ? "text-neutral-900" : "text-neutral-500"
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ================= POPULAR DISHES ================= */}
        <section id="menu" className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-900">
              Popular Dishes
            </h2>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 cursor-pointer transition duration-150"
            >
              <span>View All</span>
              <span className="text-[10px]">▶</span>
            </button>
          </div>

          {/* Grid Layout */}
          {filteredDishes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-100">
              <span className="text-5xl">🍽️</span>
              <h3 className="font-display font-bold text-lg text-neutral-800 mt-4">No dishes found</h3>
              <p className="text-neutral-400 text-sm mt-1">We are expanding our menu, check another category!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredDishes.map(dish => (
                <FoodCard key={dish.id} item={dish} />
              ))}
            </div>
          )}
        </section>

        {/* ================= LIMITED PROMO BANNER ================= */}
        <section className="py-12">
          <div className="bg-[#FFC529] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-white/40 px-3 py-1 rounded-full mb-4">
                🏷️ Limited Time Offer
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 leading-tight mb-6">
                Get <span className="text-neutral-950 font-extrabold underline decoration-white decoration-4">20% OFF</span> <br className="hidden md:inline" />
                on your first order
              </h2>
              <button
                onClick={() => setCartOpen(true)}
                className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Order Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            <div className="w-56 md:w-80 flex justify-center relative z-10">
              <img
                src="/banner_burger.png"
                alt="Special Burger Offer"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section id="about" className="py-12 border-t border-neutral-100">
          <div className="text-center max-w-md mx-auto mb-12">
            <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-900 mb-3">
              Why Choose Us
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              We focus on delivering high-quality, hot, and hygienic meals with multiple payment choices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-neutral-800 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="testimonials" className="py-12 border-t border-neutral-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-900">
                What Our Customers Say
              </h2>
            </div>
            <button className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 cursor-pointer transition duration-150">
              <span>View All</span>
              <span className="text-[10px]">▶</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-4xl text-amber-300 font-serif leading-none block mb-4">“</span>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium italic">
                    {item.text}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 border-t border-neutral-50 pt-4">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover shadow-inner" />
                  <div>
                    <h4 className="font-display font-bold text-neutral-800 text-sm leading-tight">{item.name}</h4>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 text-amber-400" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="py-12">
          <div className="bg-[#FAF6F0] rounded-3xl p-8 md:p-10 border border-orange-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display font-extrabold text-neutral-800 text-xl mb-1 flex items-center gap-2 justify-center md:justify-start">
                <span>🥗</span> Stay updated with our latest deals and offers
              </h3>
              <p className="text-neutral-500 text-xs">No spam, cancel anytime.</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-orange-500 bg-white min-w-[250px]"
              />
              <button
                onClick={() => alert("Subscribed! Thank you.")}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-sm shadow-md transition duration-200 cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-neutral-900 text-neutral-400 pt-16 pb-8 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <span className="font-display font-extrabold text-white text-xl">Y</span>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Yummy<span className="text-orange-500">.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              We connect food lovers with the finest local culinary talents, ensuring freshly prepared and fast-delivered happiness.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition">Menu</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Reviews</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Center</a></li>
              <li><a href="#" className="hover:text-white transition">Refund Policies</a></li>
              <li><a href="#" className="hover:text-white transition">Report Bug</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-2 text-xs">
              <li>📧 info@yummy.com</li>
              <li>📞 +1 (555) 234-5678</li>
              <li>📍 100 Culinary Blvd, NY</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 border-t border-neutral-800 pt-8 text-center text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Yummy. Food Delivery Service. Powered by Razorpay Sandbox.</p>
        </div>
      </footer>

      {/* Cart Slider component */}
      <CartDrawer />
    </div>
  );
}

export default Home;