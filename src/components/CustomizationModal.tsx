import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Sparkles, Flame, ShieldAlert, ShoppingBag } from 'lucide-react';
import { FoodItem, CartItemOption } from '../types';

interface CustomizationModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: FoodItem,
    quantity: number,
    selectedOptions: CartItemOption[],
    spiceLevel: 'Mild' | 'Regular' | 'Extra Spicy',
    specialNote: string
  ) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CartItemOption[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Regular' | 'Extra Spicy'>('Regular');
  const [specialNote, setSpecialNote] = useState('');

  // Reset state when a new item opens
  useEffect(() => {
    setQuantity(1);
    setSelectedOptions([]);
    setSpiceLevel('Regular');
    setSpecialNote('');
  }, [item?.id]);

  const toggleOption = (option: { id: string; name: string; price: number }) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((o) => o.id === option.id);
      if (exists) {
        return prev.filter((o) => o.id !== option.id);
      } else {
        return [...prev, { id: option.id, name: option.name, price: option.price }];
      }
    });
  };

  const addOnsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const unitPrice = item.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(item, quantity, selectedOptions, spiceLevel, specialNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Image */}
        <div className="relative h-48 sm:h-56 w-full bg-stone-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

          {/* Close button */}
          <button
            id="close-customize-modal"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dietary & Category badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${
              item.dietary === 'veg' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-rose-600 text-white'
            }`}>
              {item.dietary === 'veg' ? '🟢 100% Veg' : '🔴 Non-Veg'}
            </span>
            {item.isPopular && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                Popular Choice
              </span>
            )}
          </div>

          {/* Title & Price on Image Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif] leading-tight">
                  {item.name}
                </h2>
                {item.urduName && (
                  <p className="text-amber-200 text-sm font-semibold mt-0.5" dir="rtl">
                    {item.urduName}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-amber-200 block">Base Price</span>
                <span className="text-2xl font-black font-['Outfit',sans-serif]">
                  Rs. {item.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Description & Ingredients */}
          <div>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/50">
              <span className="text-xs font-bold text-amber-900 block mb-1.5">
                🥗 Ingredients in this dish:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-stone-700 text-xs px-2.5 py-1 rounded-lg border border-amber-200/80 font-medium shadow-2xs"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Spice Level Selection (for hot meals & snacks) */}
          {(item.category === 'snacks' || item.category === 'hot-meals') && (
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Spice Preference</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mild', 'Regular', 'Extra Spicy'] as const).map((spice) => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSpiceLevel(spice)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      spiceLevel === spice
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {spice === 'Mild' && '🌱 Mild (Kids)'}
                    {spice === 'Regular' && '🌶️ Regular'}
                    {spice === 'Extra Spicy' && '🔥 Extra Spicy'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Customization Add-ons */}
          {item.availableCustomizations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Select Custom Options &amp; Add-ons
                </label>
                <span className="text-xs text-amber-700 font-semibold">Optional</span>
              </div>

              <div className="space-y-2">
                {item.availableCustomizations.map((option) => {
                  const isChecked = selectedOptions.some((o) => o.id === option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                        isChecked
                          ? 'bg-amber-50/90 border-amber-500 text-amber-950 font-semibold shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-stone-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-amber-600 border-amber-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium">{option.name}</span>
                      </div>
                      <span className="text-sm font-bold text-amber-700">
                        {option.price > 0 ? `+Rs. ${option.price}` : 'Free'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
              Special instructions for Canteen Staff
            </label>
            <input
              type="text"
              placeholder="e.g. Less mayo, sauce on the side, cut burger into half..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity Selector & Add to Cart */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-amber-100 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity selector */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
            <button
              id="quantity-minus-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-amber-100 hover:text-amber-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-extrabold text-stone-900 text-sm">
              {quantity}
            </span>
            <button
              id="quantity-plus-btn"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-amber-100 hover:text-amber-900 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA Button */}
          <button
            id="add-customized-to-cart-btn"
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-5 rounded-2xl shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-between text-sm sm:text-base font-['Outfit',sans-serif]"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </span>
            <span className="font-extrabold bg-white/20 px-2.5 py-0.5 rounded-lg text-white">
              Rs. {totalPrice}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
