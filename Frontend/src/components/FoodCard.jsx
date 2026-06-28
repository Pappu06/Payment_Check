import { useState } from "react";
import { useCart } from "../context/CartContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-5 border border-neutral-100/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
      {/* Favorite Button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 border border-neutral-100 hover:border-red-200 hover:bg-red-50 text-neutral-400 hover:text-red-500 shadow-sm transition-all duration-200 cursor-pointer"
      >
        <svg
          className={`w-5 h-5 ${liked ? "fill-red-500 stroke-red-500" : ""}`}
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          ></path>
        </svg>
      </button>

      {/* Food Image */}
      <div className="overflow-hidden rounded-2xl bg-neutral-50 flex justify-center items-center h-44 mb-4 relative">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-36 max-w-[90%] object-contain transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info Section */}
      <div>
        <h3 className="font-display font-bold text-neutral-800 text-lg mb-1 group-hover:text-orange-600 transition-colors duration-200">
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <svg className="w-4 h-4 fill-amber-400 stroke-amber-400 text-amber-400" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
          <span className="text-xs font-bold text-neutral-700">{item.rating}</span>
          <span className="text-[10px] text-neutral-400 font-medium">({item.reviews})</span>
        </div>

        {/* Price & Add Action */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-display font-extrabold text-neutral-900 text-lg">
            ₹{item.price}
          </span>
          <button
            onClick={() => addToCart(item)}
            className="px-5 py-2 rounded-full font-bold text-sm bg-amber-400 hover:bg-orange-500 text-neutral-900 hover:text-white shadow-sm shadow-amber-400/20 hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer transform active:scale-95 flex items-center gap-1"
          >
            <span>Add</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
