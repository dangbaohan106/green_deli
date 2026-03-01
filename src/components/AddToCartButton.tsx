'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        base_price: number;
        unit: string;
        image_url: string;
    };
}

/**
 * Client Component for adding items to the Zustand cart store.
 * Provides visual feedback upon successful addition.
 */
export function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Mapping snake_case (DB) to camelCase (Zustand Store/Domain Type)
        addItem({
            id: product.id,
            name: product.name,
            basePrice: product.base_price,
            unit: product.unit,
            imageUrl: product.image_url,
            description: '', // Optional for cart display
            stock: 0,
            category: '',
            metadata: {},
            createdAt: '',
            updatedAt: ''
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all text-sm font-medium w-full sm:w-auto ${isAdded
                    ? 'bg-[#4F7942] text-white cursor-default'
                    : 'bg-[#2D2D2D] text-white hover:bg-[#4F7942] active:scale-95'
                }`}
        >
            {isAdded ? (
                <>
                    <Check size={18} />
                    <span>Added!</span>
                </>
            ) : (
                <>
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                </>
            )}
        </button>
    );
}
