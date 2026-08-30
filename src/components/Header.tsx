import React from 'react';
import { ShoppingBag, UtensilsCrossed, Sparkles, Clock, Ticket } from 'lucide-react';

interface HeaderProps {
  activeTab: 'menu' | 'specials' | 'cart' | 'tokens';
  setActiveTab: (tab: 'menu' | 'specials' | 'cart' | 'tokens') => void;
  cartCount: number;
  openCart: () => void;
  tokensCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  tokensCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top micro-bar for school status */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-between">
        <span className="hidden sm:inline">🏫 Greenwood High School • Student Canteen Portal</span>
        <span className="mx-auto sm:mx-0 flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          Live Canteen Express Active • Next Break in 45 mins
        </span>
        <span className="hidden sm:inline opacity-90">Avoid Lunch Rush!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & School Canteen Brand */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 font-['Outfit',sans-serif]">
                  Greenwood <span className="text-amber-600">Canteen</span> Express
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm uppercase tracking-wider hidden md:inline-block">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-stone-500 font-normal hidden sm:block">
                Skip the break queue • Pre-order & collect fresh
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-xl border border-amber-200/60">
            <button
              id="nav-tab-menu"
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'menu'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <span>🍔</span> Full Menu
            </button>

            <button
              id="nav-tab-specials"
              onClick={() => setActiveTab('specials')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'specials'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Today's Specials</span>
              <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">HOT</span>
            </button>

            {tokensCount > 0 && (
              <button
                id="nav-tab-tokens"
                onClick={() => setActiveTab('tokens')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  activeTab === 'tokens'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <Ticket className="w-4 h-4 text-emerald-600" />
                <span>My Active Tokens</span>
                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {tokensCount}
                </span>
              </button>
            )}
          </nav>

          {/* Right Action: Sticky Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {tokensCount > 0 && (
              <button
                id="mobile-tokens-btn"
                onClick={() => setActiveTab('tokens')}
                className="md:hidden flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Tokens ({tokensCount})</span>
              </button>
            )}

            <button
              id="header-cart-btn"
              onClick={openCart}
              className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 shadow-sm ${
                cartCount > 0
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 ring-2 ring-orange-400/30 ring-offset-1'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-['Outfit',sans-serif]">Cart</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                cartCount > 0 ? 'bg-white text-orange-600' : 'bg-stone-200 text-stone-700'
              }`}>
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden border-t border-amber-100 py-2 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'menu' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            🍔 All Menu
          </button>
          <button
            onClick={() => setActiveTab('specials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'specials' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> Today's Specials
          </button>
          {tokensCount > 0 && (
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'tokens' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              <Ticket className="w-3 h-3" /> My Tokens ({tokensCount})
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
