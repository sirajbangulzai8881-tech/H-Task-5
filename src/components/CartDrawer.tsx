import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, Clock, User, GraduationCap, 
  CreditCard, CheckCircle2, ArrowRight, AlertCircle, Sparkles, Utensils
} from 'lucide-react';
import { CartItem, BreakTimeSlot, StudentDetails, OrderToken } from '../types';
import { BREAK_SLOTS } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: OrderToken) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  // Checkout form states
  const [selectedBreakSlot, setSelectedBreakSlot] = useState<BreakTimeSlot>(
    '10:30 AM First Break (Recess)'
  );
  
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    name: 'Ayaan Khan',
    gradeSection: 'Class 10-B',
    rollNumber: '24',
    paymentMode: 'Pay at Counter'
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; grade?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick preset sample students for easy demonstration
  const quickStudents = [
    { name: 'Ayaan Khan', grade: 'Class 10-B', roll: '24' },
    { name: 'Zainab Ahmed', grade: 'Class 9-A', roll: '12' },
    { name: 'Hamza Farooq', grade: 'Class 11-Pre-Med', roll: '08' },
  ];

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const canteenFacilityFee = 0; // Free for school students
  const grandTotal = subtotal + canteenFacilityFee;

  const handleValidationAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; grade?: string } = {};

    if (!studentDetails.name.trim()) {
      errors.name = 'Please enter student name';
    }
    if (!studentDetails.gradeSection.trim()) {
      errors.grade = 'Please enter class & section (e.g. Class 10-B)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      // Generate a realistic, friendly student token ID
      const randomNum = Math.floor(10 + Math.random() * 90);
      const tokenString = `#TOKEN-${randomNum}`;
      
      const newOrder: OrderToken = {
        tokenId: tokenString,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        student: studentDetails,
        breakSlot: selectedBreakSlot,
        items: [...cartItems],
        subtotal: subtotal,
        discount: 0,
        total: grandTotal,
        counterNumber: selectedBreakSlot.includes('10:30') ? 'Counter #2 (Express Window)' : 'Counter #1 (Main Buffet)',
        status: 'Confirmed & Queued',
        pickupEstimate: selectedBreakSlot.includes('10:30') ? '10:30 AM sharp' : '1:00 PM sharp'
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClearCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Outfit',sans-serif]">
                My Food Cart &amp; Pre-Order
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your lunch tray
              </p>
            </div>
          </div>

          <button
            id="close-cart-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50/50">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 text-3xl shadow-inner">
              🥪
            </div>
            <h3 className="text-lg font-bold text-stone-800 font-['Outfit',sans-serif] mb-1">
              Your lunch tray is empty
            </h3>
            <p className="text-sm text-stone-500 max-w-xs mb-6">
              Explore today's menu to add delicious burgers, warm biryani, samosas, and drinks for your break!
            </p>
            <button
              onClick={onClose}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Browse Canteen Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* 1. Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Selected Food Items
                </h3>
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.cartId}
                    className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex items-start gap-3 relative hover:border-amber-300 transition-colors"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-stone-900 truncate font-['Outfit',sans-serif]">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartId)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dietary dot & base price */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 my-0.5">
                        <span className={`w-2 h-2 rounded-full ${
                          cartItem.item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`} />
                        <span>Rs. {cartItem.item.price} each</span>
                        {cartItem.spiceLevel && (
                          <span className="text-[10px] bg-stone-200/80 px-1.5 py-0.2 rounded text-stone-700">
                            {cartItem.spiceLevel}
                          </span>
                        )}
                      </div>

                      {/* Customization add-on pills */}
                      {cartItem.selectedOptions.length > 0 && (
                        <div className="flex flex-wrap gap-1 my-1">
                          {cartItem.selectedOptions.map((opt) => (
                            <span
                              key={opt.id}
                              className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium"
                            >
                              +{opt.name} (Rs. {opt.price})
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special Note */}
                      {cartItem.specialNote && (
                        <p className="text-[11px] text-amber-800 italic bg-amber-50/80 px-2 py-0.5 rounded mt-1 border border-amber-200/50">
                          Note: "{cartItem.specialNote}"
                        </p>
                      )}

                      {/* Quantity Selector & Item Total */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                        <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-amber-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-amber-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-extrabold text-sm text-stone-900 font-['Outfit',sans-serif]">
                          Rs. {cartItem.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Break Time Slot Selection (Requirement #4) */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Select Pickup Break Slot</span>
                </label>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Required
                </span>
              </div>

              {/* Standard Dropdown */}
              <div>
                <select
                  id="break-time-dropdown"
                  value={selectedBreakSlot}
                  onChange={(e) => setSelectedBreakSlot(e.target.value as BreakTimeSlot)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="10:30 AM First Break (Recess)">
                    ⏰ 10:30 AM First Break (Recess) - Recommended
                  </option>
                  <option value="1:00 PM Lunch Break">
                    🍱 1:00 PM Lunch Break (Main Buffet)
                  </option>
                  <option value="3:15 PM After-School Club">
                    🥤 3:15 PM After-School Club / Sports
                  </option>
                </select>
              </div>

              {/* Visual Radio Cards for quick touch selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {BREAK_SLOTS.slice(0, 2).map((slot) => {
                  const isSelected = selectedBreakSlot === slot.id;
                  return (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedBreakSlot(slot.id as BreakTimeSlot)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-white text-stone-700 border-amber-200/80 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-0.5">
                        <span>{slot.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <p className={`text-[11px] ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                        {slot.subtext}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Student Details Form (Requirement #4) */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>Student Information</span>
                </label>
                <span className="text-[10px] text-stone-500">For token verification</span>
              </div>

              {/* Quick Fill Student Sample Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[10px] text-stone-600 font-medium shrink-0">Quick Demo:</span>
                {quickStudents.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => {
                      setStudentDetails({
                        ...studentDetails,
                        name: s.name,
                        gradeSection: s.grade,
                        rollNumber: s.roll
                      });
                      setFormErrors({});
                    }}
                    className={`text-[10px] px-2 py-1 rounded-md font-semibold whitespace-nowrap border transition-all ${
                      studentDetails.name === s.name
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {s.name} ({s.grade})
                  </button>
                ))}
              </div>

              {/* Student Name Input */}
              <div>
                <label className="text-xs text-stone-600 font-semibold block mb-1">
                  Student Full Name *
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  placeholder="e.g. Ayaan Khan"
                  value={studentDetails.name}
                  onChange={(e) => {
                    setStudentDetails({ ...studentDetails, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  className={`w-full text-sm bg-white border rounded-xl px-3.5 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    formErrors.name ? 'border-rose-500 ring-1 ring-rose-300' : 'border-stone-300'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.name}
                  </p>
                )}
              </div>

              {/* Grade & Section and Roll Number (2 columns) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs text-stone-600 font-semibold block mb-1">
                    Grade &amp; Section *
                  </label>
                  <input
                    id="student-grade-input"
                    type="text"
                    placeholder="e.g. Class 10-B"
                    value={studentDetails.gradeSection}
                    onChange={(e) => {
                      setStudentDetails({ ...studentDetails, gradeSection: e.target.value });
                      if (formErrors.grade) setFormErrors({ ...formErrors, grade: undefined });
                    }}
                    className={`w-full text-sm bg-white border rounded-xl px-3.5 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      formErrors.grade ? 'border-rose-500 ring-1 ring-rose-300' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.grade && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.grade}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-stone-600 font-semibold block mb-1">
                    Roll Number
                  </label>
                  <input
                    id="student-roll-input"
                    type="text"
                    placeholder="e.g. 24"
                    value={studentDetails.rollNumber}
                    onChange={(e) => setStudentDetails({ ...studentDetails, rollNumber: e.target.value })}
                    className="w-full text-sm bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="text-xs text-stone-600 font-semibold block mb-1">
                  Payment Method at Counter
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Pay at Counter', 'Campus Card Wallet'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setStudentDetails({ ...studentDetails, paymentMode: mode })}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                        studentDetails.paymentMode === mode
                          ? 'bg-amber-100/90 text-amber-900 border-amber-400'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                      <span>{mode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Cost Breakdown */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Food Items Subtotal</span>
                <span className="font-semibold text-stone-800">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>School Express Service Fee</span>
                <span className="font-semibold text-emerald-600">FREE (Rs. 0)</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm">Grand Total Amount</span>
                <span className="text-xl font-black text-amber-600 font-['Outfit',sans-serif]">
                  Rs. {grandTotal}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Cart Drawer Footer / Confirm CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-amber-100 shrink-0">
            <button
              id="confirm-preorder-btn"
              onClick={handleValidationAndSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-between text-base font-['Outfit',sans-serif] disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                <span>{isSubmitting ? 'Generating Token...' : 'Confirm Pre-Order'}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-xl text-white font-black text-base">
                <span>Rs. {grandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            <p className="text-[11px] text-stone-600 text-center mt-2 font-medium">
              ⚡ Digital Order Token will be generated instantly for counter pickup
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
