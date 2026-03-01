import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    // 1. Lấy thông tin phân trang từ URL (Server-side)
    const params = await searchParams;
    const itemsPerPage = 8;
    const currentPage = parseInt(params.page || '1', 10);
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // 2. Khởi tạo kết nối Supabase tại Server-side
    const supabase = await createClient();

    // 3. Query dữ liệu có phân trang và lấy tổng số lượng sản phẩm
    const { data: products, error, count } = await supabase
        .from('products')
        .select('id, name, description, base_price, unit, image_url, category', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('[DB Fetch Error]:', error.message);
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
                <p className="text-red-500 font-medium">Lỗi hệ thống khi tải sản phẩm. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    const totalPages = Math.ceil((count || 0) / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#FDFDFB] text-[#2D2D2D] font-sans pb-24">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 lg:px-24 py-4 mb-16">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#4F7942] hover:text-[#2D2D2D] transition-colors font-medium">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="text-xl font-serif font-bold tracking-tight">Green Deli Shop</div>
                    <div className="w-[120px]"></div> {/* Spacer for symmetry */}
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 lg:px-24">
                {/* Page Title & Intro */}
                <header className="mb-12">
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-20 flex justify-center items-center gap-4">
                        <Link
                            href={currentPage > 1 ? `/shop?page=${currentPage - 1}` : '#'}
                            className={`p-3 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}
                        >
                            <ChevronLeft size={24} />
                        </Link>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/shop?page=${page}`}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-medium ${currentPage === page
                                            ? 'bg-[#4F7942] text-white'
                                            : 'hover:bg-gray-50 text-gray-400'
                                        }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={currentPage < totalPages ? `/shop?page=${currentPage + 1}` : '#'}
                            className={`p-3 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}
                        >
                            <ChevronRight size={24} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
