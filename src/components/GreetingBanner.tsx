import React from 'react';
import { Search, Sparkles, Clock, Zap, ShieldCheck } from 'lucide-react';

interface GreetingBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectSpecial: () => void;
}

export const GreetingBanner: React.FC<GreetingBannerProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectSpecial
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/15 p-6 sm:p-8 mb-8 border border-orange-400/40">
      {/* Background soft patterns */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Friendly Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Greenwood Express Pre-Order System</span>
        </div>

        {/* Main Greeting Banner Text */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight text-white mb-2">
          Pre-order your lunch &amp; skip the break queue! 🥪
        </h1>

        <p className="text-amber-100 text-sm sm:text-base mb-6 max-w-2xl font-normal leading-relaxed">
          Order your favorite snacks and hot meals in advance. Get your unique digital token and pick up hot food immediately when the break bell rings.
        </p>

        {/* Quick Highlights / Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-amber-100 font-medium">Break Slots</p>
              <p className="text-sm font-bold text-white">10:30 AM &amp; 1:00 PM</p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <p className="text-xs text-amber-100 font-medium">Wait Time</p>
              <p className="text-sm font-bold text-white">&lt; 2 Mins Express</p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <p className="text-xs text-amber-100 font-medium">Fresh Hygiene</p>
              <p className="text-sm font-bold text-white">100% Campus Certified</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            id="menu-search-input"
            type="text"
            placeholder="Search burgers, biryani, samosas, pasta, smoothies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-stone-900 placeholder:text-stone-400 pl-11 pr-24 py-3.5 rounded-2xl text-sm font-medium shadow-md focus:outline-none focus:ring-4 focus:ring-amber-300/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-2.5 py-1 rounded-lg font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
