import React from 'react';
import { Sparkles, Flame, Plus, ArrowRight, Heart } from 'lucide-react';
import { FoodItem } from '../types';

interface TodaysSpecialsBannerProps {
  specials: FoodItem[];
  onOpenCustomize: (item: FoodItem) => void;
}

export const TodaysSpecialsBanner: React.FC<TodaysSpecialsBannerProps> = ({
  specials,
  onOpenCustomize,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <span>Today's Chef Specials &amp; Fast Picks</span>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Fresh Daily
              </span>
            </h2>
            <p className="text-xs text-stone-600">
              Hot and ready for quick pickup during first and second break
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specials.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenCustomize(item)}
            className="group bg-gradient-to-b from-amber-50/70 to-white rounded-2xl border border-amber-200/80 hover:border-amber-400 p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-stone-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold">
                {item.dietary === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                ⏱️ {item.prepTime}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-amber-600 transition-colors font-['Outfit',sans-serif]">
                {item.name}
              </h3>
              <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5 mb-3">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
              <span className="font-extrabold text-sm sm:text-base text-stone-900 font-['Outfit',sans-serif]">
                Rs. {item.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCustomize(item);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pre-Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
