import { PricingStrategy } from '@/types/domain';

/**
 * Standard Pricing Strategy: calculates the price based on base price and quantity.
 */
export class StandardPricingStrategy implements PricingStrategy {
    calculate(basePrice: number, quantity: number): number {
        return basePrice * quantity;
    }
}

/**
 * VIP Discount Strategy: applies a fixed percentage discount (e.g., 10%).
 */
export class VIPPricingStrategy implements PricingStrategy {
    constructor(private discountRate: number = 0.1) { }

    calculate(basePrice: number, quantity: number): number {
        return basePrice * quantity * (1 - this.discountRate);
    }
}

/**
 * Volume-based Pricing Strategy: applies a discount if the quantity exceeds a threshold.
 */
export class VolumePricingStrategy implements PricingStrategy {
    constructor(
        private threshold: number = 5,
        private discountRate: number = 0.15
    ) { }

    calculate(basePrice: number, quantity: number): number {
        const total = basePrice * quantity;
        if (quantity >= this.threshold) {
            return total * (1 - this.discountRate);
        }
        return total;
    }
}

/**
 * Pricing Context to use the strategy pattern.
 */
export class PricingContext {
    private strategy: PricingStrategy;

    constructor(strategy: PricingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PricingStrategy) {
        this.strategy = strategy;
    }

    calculatePrice(basePrice: number, quantity: number): number {
        return this.strategy.calculate(basePrice, quantity);
    }
}

/**
 * Factory function to create pricing strategy based on user profile or product.
 * @param type Strategy type
 * @returns PricingStrategy instance
 */
export function getPricingStrategy(
    type: 'standard' | 'vip' | 'volume',
    options?: { discountRate?: number; threshold?: number }
): PricingStrategy {
    switch (type) {
        case 'vip':
            return new VIPPricingStrategy(options?.discountRate);
        case 'volume':
            return new VolumePricingStrategy(options?.threshold, options?.discountRate);
        case 'standard':
        default:
            return new StandardPricingStrategy();
    }
}
