import React from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

// Định nghĩa Interface dựa trên cấu trúc SQL (snake_case)
interface ProductModel {
    id: string;
    name: string;
    description: string;
    base_price: number;
    unit: string;
    image_url: string;
    category: string;
}

export default async function ShopPage() {
    // 1. Khởi tạo kết nối Supabase tại Server-side
    const supabase = await createClient();

    // 2. Query dữ liệu từ table products (Lấy data trực tiếp, không qua API trung gian)
    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, description, base_price, unit, image_url, category')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[DB Fetch Error]:', error.message);
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
                <p className="text-red-500 font-medium">Lỗi hệ thống khi tải sản phẩm. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFB] text-[#2D2D2D] font-sans px-8 py-24 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-5xl font-serif mb-4">Our Organic Selection</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Browse our curated list of fresh, premium organic produce. Sourced directly from certified farms.
                    </p>
                </header>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products?.map((product: ProductModel) => (
                        <div key={product.id} className="group flex flex-col cursor-pointer border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all bg-white">
                            {/* Product Image */}
                            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#4F7942]">
                                    {product.category}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold mb-2 font-serif">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-semibold">${product.base_price.toFixed(2)}</span>
                                        <span className="text-xs text-gray-400">per {product.unit}</span>
                                    </div>
                                    <button className="bg-[#2D2D2D] text-white px-6 py-3 rounded-full hover:bg-[#4F7942] transition-colors text-sm font-medium">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
