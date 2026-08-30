import React, { useState } from 'react';
import { 
  CheckCircle2, Copy, Check, Printer, Clock, Utensils, 
  MapPin, ShieldCheck, Sparkles, X, ChevronRight 
} from 'lucide-react';
import { OrderToken } from '../types';

interface OrderTokenModalProps {
  order: OrderToken | null;
  isOpen: boolean;
  onClose: () => void;
  onViewMenu: () => void;
}

export const OrderTokenModal: React.FC<OrderTokenModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewMenu
}) => {
  if (!isOpen || !order) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(order.tokenId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-100 flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top celebratory banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/20">
            <CheckCircle2 className="w-8 h-8 text-white stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-emerald-100 inline-block mb-1">
            Pre-Order Confirmed &amp; Queued!
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif]">
            Greenwood Canteen Express Receipt
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Show this digital token at the express counter to collect your food
          </p>
        </div>

        {/* Modal Content / Receipt Ticket */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-5">
          
          {/* Main Token Display Card */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 p-5 rounded-2xl border-2 border-dashed border-amber-300 text-center relative shadow-xs">
            {/* Cutout notches on sides for ticket look */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-amber-300" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-amber-300" />

            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
              Your Digital Pickup Token
            </p>
            
            <div className="flex items-center justify-center gap-2 my-2">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight font-['Outfit',sans-serif] bg-white px-4 py-2 rounded-xl shadow-xs border border-amber-200">
                {order.tokenId}
              </span>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
                title="Copy Token ID"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-700" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Status: Food prep scheduled in kitchen</span>
            </div>

            {/* Simulated Barcode */}
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex flex-col items-center">
              <div className="flex items-center gap-1 h-8 px-4 bg-white rounded-md py-1">
                {[4, 2, 6, 3, 5, 2, 7, 3, 2, 5, 6, 2, 4, 3, 6, 4, 2, 5, 3, 6, 2, 4].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 sm:w-1 bg-stone-800 rounded-xs"
                    style={{ height: `${h * 4}px` }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-stone-600 font-mono tracking-widest mt-1">
                *GW-EXPRESS-{order.tokenId.replace('#', '')}*
              </p>
            </div>
          </div>

          {/* Student & Pickup Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div>
              <p className="text-stone-600 font-medium">Student Name</p>
              <p className="font-bold text-stone-900 text-sm">{order.student.name}</p>
            </div>
            <div>
              <p className="text-stone-600 font-medium">Class / Section</p>
              <p className="font-bold text-stone-900 text-sm">
                {order.student.gradeSection} {order.student.rollNumber ? `(Roll #${order.student.rollNumber})` : ''}
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200">
              <p className="text-stone-600 font-medium">Break Pickup Slot</p>
              <p className="font-bold text-amber-700 text-xs sm:text-sm">{order.breakSlot}</p>
            </div>
            <div className="pt-2 border-t border-stone-200">
              <p className="text-stone-600 font-medium">Assigned Counter</p>
              <p className="font-bold text-emerald-700 text-xs sm:text-sm">{order.counterNumber}</p>
            </div>
          </div>

          {/* Itemized Food Summary */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>Pre-Ordered Items ({order.items.length})</span>
            </h4>
            <div className="divide-y divide-stone-100 bg-stone-50 rounded-2xl p-3 border border-stone-200/70 space-y-2">
              {order.items.map((cartItem, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-start justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-stone-900">
                      {cartItem.quantity}x {cartItem.item.name}
                    </span>
                    {cartItem.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-amber-800">
                        {cartItem.selectedOptions.map(o => o.name).join(', ')}
                      </p>
                    )}
                    {cartItem.specialNote && (
                      <p className="text-[10px] text-stone-500 italic">"{cartItem.specialNote}"</p>
                    )}
                  </div>
                  <span className="font-bold text-stone-800 shrink-0">
                    Rs. {cartItem.totalPrice}
                  </span>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-baseline font-bold text-stone-900 text-sm">
                <span>Total Due at Pickup</span>
                <span className="text-base font-extrabold text-amber-600 font-['Outfit',sans-serif]">
                  Rs. {order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Pro-tip for school break */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Canteen Quick Tip:</span> Head directly to{' '}
              <span className="font-semibold underline">{order.counterNumber}</span> at{' '}
              <span className="font-semibold">{order.breakSlot.split(' ')[0]}</span>. Show this token on your phone screen or tell the canteen master your Token ID.
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-amber-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            id="modal-done-btn"
            onClick={() => {
              onClose();
              onViewMenu();
            }}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition-all active:scale-98 font-['Outfit',sans-serif]"
          >
            <span>Back to Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
