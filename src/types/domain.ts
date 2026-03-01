/**
 * Core domain types for Green Deli e-commerce platform.
 */

export type StrategyType = 'standard' | 'vip' | 'volume';

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Renamed from price to align with Strategy Pattern
  unit: string; // e.g., 'kg', 'bundle', 'piece'
  stock: number;
  imageUrl?: string;
  category: string;
  metadata: Record<string, any>; // Flexible JSONB for ML (e.g., organic standard, vegetable type)
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number; // Price at the time of adding to cart
  quantity: number;
  unit: string;
  imageUrl?: string;
  strategyType: StrategyType; // Track applied strategy for transparency
}

export interface Order {
  id: string;
  userId: string;
  items: Record<string, CartItem>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
}

/**
 * Strategy Pattern Interface for pricing calculations.
 */
export interface PricingStrategy {
  calculate(basePrice: number, quantity: number): number;
}
