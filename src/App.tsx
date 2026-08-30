import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { GreetingBanner } from './components/GreetingBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { FoodCard } from './components/FoodCard';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTokenModal } from './components/OrderTokenModal';
import { TodaysSpecialsBanner } from './components/TodaysSpecialsBanner';
import { ActiveTokensView } from './components/ActiveTokensView';
import { CANTEEN_MENU } from './data/menuData';
import { FoodItem, FoodCategory, DietaryType, CartItem, CartItemOption, OrderToken } from './types';
import { 
  Utensils, Sparkles, Clock, CheckCircle2, 
  ShoppingBag, HelpCircle, ChevronRight, RefreshCw, Layers
} from 'lucide-react';

export default function App() {
  // Navigation & filters
  const [activeTab, setActiveTab] = useState<'menu' | 'specials' | 'cart' | 'tokens'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active Selections
  const [customizingItem, setCustomizingItem] = useState<FoodItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<OrderToken | null>(null);
  const [showDemoGuide, setShowDemoGuide] = useState(true);

  // Cart & Orders State (with LocalStorage fallback)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gw_canteen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderToken[]>(() => {
    try {
      const saved = localStorage.getItem('gw_canteen_orders');
      if (saved) return JSON.parse(saved);
      // Default sample token for realistic preview
      return [
        {
          tokenId: '#TOKEN-42',
          createdAt: '10:05 AM',
          student: {
            name: 'Ayaan Khan',
            gradeSection: 'Class 10-B',
            rollNumber: '24',
            paymentMode: 'Pay at Counter'
          },
          breakSlot: '10:30 AM First Break (Recess)',
          items: [
            {
              cartId: 'sample-cart-1',
              item: CANTEEN_MENU[0],
              quantity: 1,
              selectedOptions: [{ id: 'opt-cheese', name: 'Extra Cheddar Cheese Slice', price: 30 }],
              spiceLevel: 'Regular',
              specialNote: 'Extra napkins please',
              unitPrice: 270,
              totalPrice: 270
            }
          ],
          subtotal: 270,
          discount: 0,
          total: 270,
          counterNumber: 'Counter #2 (Express Window)',
          status: 'Confirmed & Queued',
          pickupEstimate: '10:30 AM sharp'
        }
      ];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('gw_canteen_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('gw_canteen_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Total quantity count for header cart pill
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return CANTEEN_MENU.filter((item) => {
      // Tab filter
      if (activeTab === 'specials' && !item.isSpecial) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesUrdu = item.urduName?.includes(query);
        const matchesIng = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesUrdu && !matchesIng) return false;
      }

      return true;
    });
  }, [activeTab, selectedCategory, dietaryFilter, searchQuery]);

  // Item counts for category badges
  const categoryCounts = useMemo(() => {
    return {
      all: CANTEEN_MENU.length,
      snacks: CANTEEN_MENU.filter(i => i.category === 'snacks').length,
      'hot-meals': CANTEEN_MENU.filter(i => i.category === 'hot-meals').length,
      drinks: CANTEEN_MENU.filter(i => i.category === 'drinks').length,
      healthy: CANTEEN_MENU.filter(i => i.category === 'healthy').length,
    };
  }, []);

  // Today's specials list
  const specialsList = useMemo(() => {
    return CANTEEN_MENU.filter(i => i.isSpecial);
  }, []);

  // Cart operations
  const handleAddToCart = (
    item: FoodItem,
    quantity: number,
    selectedOptions: CartItemOption[],
    spiceLevel: 'Mild' | 'Regular' | 'Extra Spicy',
    specialNote: string
  ) => {
    const addOnsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    const unitPrice = item.price + addOnsTotal;
    const totalPrice = unitPrice * quantity;

    const newCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      item,
      quantity,
      selectedOptions,
      spiceLevel,
      specialNote,
      unitPrice,
      totalPrice
    };

    setCartItems(prev => [...prev, newCartItem]);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => 
      prev.map(ci => {
        if (ci.cartId === cartId) {
          const newQty = Math.max(1, ci.quantity + delta);
          return {
            ...ci,
            quantity: newQty,
            totalPrice: ci.unitPrice * newQty
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(ci => ci.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (newOrder: OrderToken) => {
    setOrders(prev => [newOrder, ...prev]);
    setIsCartOpen(false);
    setActiveReceiptOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Sticky Header with Navigation & Live Cart */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'cart') {
            setIsCartOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        tokensCount={orders.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Active Tab Views */}
        {activeTab === 'tokens' ? (
          <ActiveTokensView
            tokens={orders}
            onOpenTokenDetails={(token) => setActiveReceiptOrder(token)}
            onGoToMenu={() => setActiveTab('menu')}
          />
        ) : (
          <>
            {/* Top Greeting & Announcement Banner */}
            <GreetingBanner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectSpecial={() => setActiveTab('specials')}
            />

            {/* Today's Specials Highlight Row (shown on menu or when specials tab is active) */}
            {activeTab === 'specials' ? (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-stone-900 font-['Outfit',sans-serif]">
                      Today's Specials
                    </h2>
                    <p className="text-sm text-stone-500">
                      Chef-curated lunch specials with fastest preparation for break times.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
                  >
                    View All Items
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {specialsList.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      onOpenCustomize={(it) => setCustomizingItem(it)}
                      onQuickAdd={(it) => setCustomizingItem(it)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Highlight banner for specials when viewing full menu */}
                <TodaysSpecialsBanner
                  specials={specialsList.slice(0, 4)}
                  onOpenCustomize={(it) => setCustomizingItem(it)}
                />

                {/* Category & Dietary Filters */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                    Explore Food Menu
                  </h2>
                  <span className="text-xs text-stone-600 font-semibold bg-stone-100 px-2.5 py-1 rounded-full">
                    {filteredItems.length} items available
                  </span>
                </div>

                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  dietaryFilter={dietaryFilter}
                  onSelectDietary={setDietaryFilter}
                  itemCounts={categoryCounts}
                />

                {/* Food Items Grid */}
                {filteredItems.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-amber-100 p-12 text-center my-6">
                    <p className="text-3xl mb-2">🔍</p>
                    <h3 className="text-base font-bold text-stone-800">No dishes match your filter</h3>
                    <p className="text-xs text-stone-500 mt-1 mb-4">
                      Try clearing your search query or selecting "All Items".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setDietaryFilter('all');
                      }}
                      className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {filteredItems.map((item) => (
                      <FoodCard
                        key={item.id}
                        item={item}
                        onOpenCustomize={(it) => setCustomizingItem(it)}
                        onQuickAdd={(it) => setCustomizingItem(it)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

      </main>

      {/* Floating 2-Minute Demo Flow Guide (Helpful overlay for prototype submission presentation) */}
      {showDemoGuide && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 bg-stone-900/95 text-white p-4 rounded-2xl shadow-2xl border border-stone-700 backdrop-blur-md animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-['Outfit',sans-serif]">
                2-Minute Submission Demo Flow
              </span>
            </div>
            <button
              onClick={() => setShowDemoGuide(false)}
              className="text-stone-400 hover:text-white text-xs font-semibold px-2 py-0.5"
            >
              ✕ Dismiss
            </button>
          </div>
          
          <div className="text-[11px] space-y-1.5 text-stone-300">
            <p><b className="text-amber-400">0:00 - 0:35:</b> Browse homepage, category tabs &amp; specials.</p>
            <p><b className="text-amber-400">0:35 - 1:10:</b> Click any dish to customize options &amp; add to cart.</p>
            <p><b className="text-amber-400">1:10 - 1:40:</b> Open Cart, choose break slot (10:30 AM), enter class info.</p>
            <p><b className="text-amber-400">1:40 - 2:00:</b> Click Confirm Pre-Order to show generated Token Receipt.</p>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="text-[10px] text-stone-400">Greenwood High Canteen Express</span>
            <button
              onClick={() => {
                setCustomizingItem(CANTEEN_MENU[0]);
              }}
              className="text-[11px] bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>Try Demo Item</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Food Customization Modal */}
      <CustomizationModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Token Receipt Modal */}
      <OrderTokenModal
        order={activeReceiptOrder}
        isOpen={Boolean(activeReceiptOrder)}
        onClose={() => setActiveReceiptOrder(null)}
        onViewMenu={() => {
          setActiveReceiptOrder(null);
          setActiveTab('menu');
        }}
      />

      {/* Simple Clean Canteen Footer */}
      <footer className="mt-16 bg-white border-t border-amber-100 py-8 px-4 text-center text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
              GW
            </div>
            <span className="font-bold text-stone-800 font-['Outfit',sans-serif]">
              Greenwood High Canteen Express Prototype
            </span>
          </div>

          <p className="text-stone-600">
            Freshly prepared food • Designed for student break convenience • Fast-track pickup counters
          </p>

          <div className="flex items-center gap-3 text-stone-600">
            <span>First Break: 10:30 AM</span>
            <span>•</span>
            <span>Lunch Break: 1:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
