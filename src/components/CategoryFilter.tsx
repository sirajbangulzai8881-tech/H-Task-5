import React from 'react';
import { FoodCategory, DietaryType } from '../types';

interface CategoryFilterProps {
  selectedCategory: FoodCategory;
  onSelectCategory: (cat: FoodCategory) => void;
  dietaryFilter: 'all' | DietaryType;
  onSelectDietary: (diet: 'all' | DietaryType) => void;
  itemCounts: {
    all: number;
    snacks: number;
    'hot-meals': number;
    drinks: number;
    healthy: number;
  };
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  dietaryFilter,
  onSelectDietary,
  itemCounts
}) => {
  const categories: { id: FoodCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Items', icon: '🍽️' },
    { id: 'snacks', label: 'Snacks', icon: '🥪' },
    { id: 'hot-meals', label: 'Hot Meals', icon: '🍲' },
    { id: 'drinks', label: 'Drinks', icon: '🥤' },
    { id: 'healthy', label: 'Healthy Corner', icon: '🥗' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/20 scale-[1.02]'
                    : 'bg-white text-stone-700 border-amber-100 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {itemCounts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dietary Badges Filter (Veg / Non-Veg) */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-200/70 shadow-xs">
          <button
            id="diet-filter-all"
            onClick={() => onSelectDietary('all')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              dietaryFilter === 'all'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Food
          </button>
          
          <button
            id="diet-filter-veg"
            onClick={() => onSelectDietary('veg')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-100 text-emerald-900 font-bold'
                : 'text-stone-600 hover:text-emerald-700'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-300 inline-block" />
            <span>Veg Only</span>
          </button>

          <button
            id="diet-filter-non-veg"
            onClick={() => onSelectDietary('non-veg')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              dietaryFilter === 'non-veg'
                ? 'bg-rose-100 text-rose-900 font-bold'
                : 'text-stone-600 hover:text-rose-700'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-rose-300 inline-block" />
            <span>Non-Veg</span>
          </button>
        </div>
      </div>
    </div>
  );
};
