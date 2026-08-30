import React from 'react';
import { Sparkles, Plus, Clock, Flame } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  onOpenCustomize: (item: FoodItem) => void;
  onQuickAdd: (item: FoodItem, e: React.MouseEvent) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onOpenCustomize,
  onQuickAdd
}) => {
  const isVeg = item.dietary === 'veg';

  return (
    <div
      id={`food-card-${item.id}`}
      onClick={() => onOpenCustomize(item)}
      className="group bg-white rounded-2xl border border-amber-100/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image & Badges Container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Dietary Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs border border-white/40">
          {isVeg ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-300 inline-block" />
              <span className="text-emerald-800 font-bold">🟢 Veg</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-rose-300 inline-block" />
              <span className="text-rose-800 font-bold">🔴 Non-Veg</span>
            </>
          )}
        </div>

        {/* Badges Top Right (Popular / Special) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {item.isPopular && (
            <div className="flex items-center gap-1 bg-amber-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              <Sparkles className="w-3 h-3 fill-amber-200 text-amber-200" />
              <span>⭐ Popular</span>
            </div>
          )}
          {item.badgeText && !item.isPopular && (
            <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
              {item.badgeText}
            </div>
          )}
        </div>

        {/* Bottom stats inside image (prep time & calories) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{item.prepTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>{item.calories} kcal</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dish Name & Urdu Name */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-amber-600 transition-colors font-['Outfit',sans-serif]">
              {item.name}
            </h3>
          </div>

          {item.urduName && (
            <p className="text-xs text-stone-600 font-semibold mb-2" dir="rtl">
              {item.urduName}
            </p>
          )}

          {/* Simple Ingredients List */}
          <div className="mb-4">
            <p className="text-[11px] text-stone-500 font-medium mb-1">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 4).map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-amber-50/80 text-stone-600 text-[10px] px-2 py-0.5 rounded-md border border-amber-100/60 font-medium"
                >
                  {ing}
                </span>
              ))}
              {item.ingredients.length > 4 && (
                <span className="text-[10px] text-stone-600 font-medium self-center">
                  +{item.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price & Add to Order Button */}
        <div className="pt-3 border-t border-amber-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-600 block font-medium">Price</span>
            <span className="text-lg sm:text-xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
              Rs. {item.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`add-to-order-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onOpenCustomize(item);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
