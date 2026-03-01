import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, StrategyType } from '@/types/domain';
import { getPricingStrategy, PricingContext } from '@/lib/pricing';

interface CartState {
    /**
     * Cart items stored in a Hash Map (Record) for O(1) access.
     * Key is the productId.
     */
    items: Record<string, CartItem>;
    addItem: (product: Product, quantity?: number, strategy?: StrategyType) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: (strategyType?: StrategyType) => number;
}

/**
 * Zustand store for managing shopping cart state.
 * Uses a Hash Map (Record<string, CartItem>) to ensure O(1) time complexity.
 */
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: {},

            /**
             * Adds a product to the cart.
             */
            addItem: (product: Product, quantity = 1, strategy: StrategyType = 'standard') => {
                set((state) => {
                    const existingItem = state.items[product.id];
                    const newItems = { ...state.items };

                    if (existingItem) {
                        newItems[product.id] = {
                            ...existingItem,
                            quantity: existingItem.quantity + quantity,
                            strategyType: strategy, // Update strategy if changed
                        };
                    } else {
                        newItems[product.id] = {
                            productId: product.id,
                            productName: product.name,
                            price: product.basePrice,
                            unit: product.unit,
                            imageUrl: product.imageUrl,
                            quantity,
                            strategyType: strategy,
                        };
                    }

                    return { items: newItems };
                });
            },

            /**
             * Removes an item from the cart.
             */
            removeItem: (productId: string) => {
                set((state) => {
                    const newItems = { ...state.items };
                    delete newItems[productId];
                    return { items: newItems };
                });
            },

            /**
             * Updates the quantity of a specific item.
             */
            updateQuantity: (productId: string, quantity: number) => {
                set((state) => {
                    if (quantity <= 0) {
                        const newItems = { ...state.items };
                        delete newItems[productId];
                        return { items: newItems };
                    }

                    const existingItem = state.items[productId];
                    if (!existingItem) return state;

                    return {
                        items: {
                            ...state.items,
                            [productId]: { ...existingItem, quantity },
                        },
                    };
                });
            },

            /**
             * Clears all items from the cart.
             */
            clearCart: () => set({ items: {} }),

            /**
             * Calculates the total number of items in the cart.
             */
            getTotalItems: () => {
                const { items } = get();
                return Object.values(items).reduce((total, item) => total + item.quantity, 0);
            },

            /**
             * Calculates the total price using the Strategy Pattern.
             * Injects PricingContext for polymorphic calculation.
             */
            getTotalPrice: (overrideStrategy?: StrategyType) => {
                const { items } = get();
                return Object.values(items).reduce((total, item) => {
                    // Use item's assigned strategy or override (e.g., from user profile/VIP status)
                    const strategyType = overrideStrategy || item.strategyType || 'standard';
                    const strategy = getPricingStrategy(strategyType);
                    const context = new PricingContext(strategy);

                    return total + context.calculatePrice(item.price, item.quantity);
                }, 0);
            },
        }),
        {
            name: 'green-deli-cart',
        }
    )
);
