import React from 'react';
import { Ticket, Clock, Utensils, CheckCircle2, Copy, AlertCircle, ArrowRight } from 'lucide-react';
import { OrderToken } from '../types';

interface ActiveTokensViewProps {
  tokens: OrderToken[];
  onOpenTokenDetails: (token: OrderToken) => void;
  onGoToMenu: () => void;
}

export const ActiveTokensView: React.FC<ActiveTokensViewProps> = ({
  tokens,
  onOpenTokenDetails,
  onGoToMenu,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-['Outfit',sans-serif]">
            My Active Orders &amp; Pickup Tokens
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Show these digital tokens at the canteen express window when the bell rings.
          </p>
        </div>

        <button
          onClick={onGoToMenu}
          className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <span>Order More Food</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {tokens.length === 0 ? (
        <div className="bg-white rounded-3xl border border-amber-100 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 text-2xl">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 font-['Outfit',sans-serif] mb-1">
            No active tokens yet
          </h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
            Pre-order your favorite snacks or lunch box now to skip the queue and get your instant token receipt!
          </p>
          <button
            onClick={onGoToMenu}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            Explore Today's Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tokens.map((token) => (
            <div
              key={token.tokenId}
              onClick={() => onOpenTokenDetails(token)}
              className="bg-white rounded-2xl border-2 border-amber-200 hover:border-amber-400 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex flex-col justify-between group"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-2xl font-black font-['Outfit',sans-serif] text-stone-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 group-hover:bg-amber-100 transition-colors">
                  {token.tokenId}
                </span>

                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>Scheduled for Break</span>
                </div>
              </div>

              {/* Student & Slot Info */}
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium">Student:</span>
                  <span className="font-bold text-stone-900">{token.student.name} ({token.student.gradeSection})</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium">Pickup Time:</span>
                  <span className="font-bold text-amber-700">{token.breakSlot}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium">Window:</span>
                  <span className="font-bold text-emerald-700">{token.counterNumber}</span>
                </div>
              </div>

              {/* Items List Preview */}
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 mb-4 text-xs space-y-1">
                {token.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-stone-700 font-medium">
                    <span>{item.quantity}x {item.item.name}</span>
                    <span>Rs. {item.totalPrice}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Total Amount</span>
                  <span className="text-base font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                    Rs. {token.total}
                  </span>
                </div>

                <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Full Receipt &amp; Barcode &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
