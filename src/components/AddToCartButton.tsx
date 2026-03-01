'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';

// Cấu trúc Product truyền từ trang chủ xuống
interface AddToCartProps {
    product: {
        id: string;
        name: string;
        description: string;
        basePrice: number;
        unit: string;
        imageUrl: string;
        category: string;
    };
}

/**
 * Client Component for adding items to the cart.
 * Uses custom toast notifications for feedback.
 */
export default function AddToCartButton({ product }: AddToCartProps) {
    const addItem = useCartStore((state) => state.addItem);
    const addToast = useToastStore((state) => state.addToast);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();

        const productForCart = {
            id: product.id,
            name: product.name,
            description: product.description,
            basePrice: product.basePrice,
            unit: product.unit,
            stock: 99,
            imageUrl: product.imageUrl,
            category: product.category,
            metadata: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        addItem(productForCart, 1, 'standard');

        // Show custom in-app notification
        addToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');

        console.log(`[Telemetry] add_to_cart: ${product.name}`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="bg-[#2D2D2D] text-white px-6 py-3 rounded-full hover:bg-[#4F7942] transition-all text-sm font-medium z-10 active:scale-95 duration-200"
        >
            Add to Cart
        </button>
    );
}