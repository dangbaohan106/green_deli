'use client'; // Bắt buộc vì có sự kiện onClick và Zustand Store

import React from 'react';
import { useCartStore } from '@/store/useCartStore';

// Cấu trúc Product truyền từ trang chủ xuống
interface AddToCartProps {
    product: {
        id: string;
        name: string;
        description: string;
        basePrice: number; // Đã map từ DB lên Next.js
        unit: string;
        imageUrl: string;
        category: string;
    };
}

export default function AddToCartButton({ product }: AddToCartProps) {
    // Gọi hàm addItem từ Zustand Hash Map (O(1) Time Complexity)
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn chặn reload trang nếu nút nằm trong thẻ <Link>

        // Transform data map với interface Product trong domain.ts
        const productForCart = {
            id: product.id,
            name: product.name,
            description: product.description,
            basePrice: product.basePrice,
            unit: product.unit,
            stock: 99, // Giả định kho dồi dào ở Client, kiểm tra thực tế ở Server
            imageUrl: product.imageUrl,
            category: product.category,
            metadata: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        addItem(productForCart, 1, 'standard');

        // Data Lineage Hook (Phục vụ Tracking)
        console.log(`[Telemetry] add_to_cart: ${product.name}`);
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="bg-[#2D2D2D] text-white px-6 py-3 rounded-full hover:bg-[#4F7942] transition-colors text-sm font-medium z-10"
        >
            Add to Cart
        </button>
    );
}