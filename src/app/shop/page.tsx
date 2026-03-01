import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 0; // Force dynamic rendering to always reflect latest DB changes

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
    searchParams: Promise<{ page?: string; category?: string }>;
}) {
    // 1. Lấy thông tin phân trang và lọc từ URL (Server-side)
    const params = await searchParams;
    const itemsPerPage = 9; // Changed to 9 for 3-column grid symmetry
    const currentPage = parseInt(params.page || '1', 10);
    const selectedCategory = params.category || 'All';

    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // 2. Khởi tạo kết nối Supabase tại Server-side
    const supabase = await createClient();

    // 3. Query dữ liệu có phân trang, lọc và lấy tổng số lượng sản phẩm
    let query = supabase
        .from('products')
        .select('id, name, description, base_price, unit, image_url, category', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
    }

    const { data: products, error, count } = await query;

    // 4. Lấy danh sách danh mục duy nhất để hiển thị bộ lọc
    const { data: categoriesData } = await supabase
        .from('products')
        .select('category');

    const uniqueCategories = ['All', ...Array.from(new Set(categoriesData?.map(c => c.category) || []))];

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
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 lg:px-24 py-4 mb-12">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#4F7942] hover:text-[#2D2D2D] transition-colors font-medium group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="text-2xl font-serif font-bold tracking-tight text-[#2D2D2D]">Green Deli</div>
                    <div className="flex items-center gap-6">
                        <Link href="/cart" className="text-sm font-medium hover:text-[#4F7942] transition-colors">Cart</Link>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-[10px] font-bold">BH</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
                {/* Page Title & Intro */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <header className="max-w-2xl">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#4F7942] font-bold mb-3 block">Organic Market</span>
                        <h1 className="text-6xl font-serif leading-tight">Fresh Produce <br /><span className="italic">Directly to You</span></h1>
                    </header>
                    <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                        Curated collection of the finest organic produce from California to Georgia. Harvested at peak ripeness.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        <Filter size={18} className="text-gray-400 shrink-0" />
                        {uniqueCategories.map((cat) => (
                            <Link
                                key={cat}
                                href={`/shop?category=${cat}`}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-[#4F7942] text-white shadow-lg shadow-green-100'
                                    : 'bg-white border border-gray-100 text-gray-500 hover:border-[#4F7942]'
                                    }`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                        Showing <span className="text-[#2D2D2D]">{products?.length || 0}</span> of <span className="text-[#2D2D2D]">{count || 0}</span> products
                    </div>
                </div>

                {/* Product Grid - Enhanced for LARGER CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products?.map((product: ProductModel) => (
                        <div key={product.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
                            {/* Product Image */}
                            <div className="relative h-[400px] w-full bg-gray-50 overflow-hidden">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-serif italic text-xl">Green Deli</div>
                                )}
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#4F7942] shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">{product.name}</h3>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[#2D2D2D]">${product.base_price.toFixed(2)}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">per {product.unit}</div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-10 leading-relaxed line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="mt-auto">
                                    {/* DATA MAPPING CHUẨN XÁC: DB (snake_case) -> Component (camelCase) */}
                                    <AddToCartButton
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            description: product.description,
                                            basePrice: product.base_price, // Ánh xạ giá
                                            unit: product.unit,
                                            imageUrl: product.image_url,   // Ánh xạ hình ảnh
                                            category: product.category
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-24 flex justify-center items-center gap-6">
                        <Link
                            href={currentPage > 1 ? `/shop?page=${currentPage - 1}${selectedCategory !== 'All' ? `&category=${selectedCategory}` : ''}` : '#'}
                            className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:shadow-xl hover:-translate-x-1'
                                }`}
                        >
                            <ChevronLeft size={24} />
                        </Link>

                        <div className="flex items-center gap-3">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/shop?page=${page}${selectedCategory !== 'All' ? `&category=${selectedCategory}` : ''}`}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-bold text-sm ${currentPage === page
                                        ? 'bg-[#2D2D2D] text-white shadow-lg'
                                        : 'hover:bg-white border border-transparent hover:border-gray-100 text-gray-400'
                                        }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={currentPage < totalPages ? `/shop?page=${currentPage + 1}${selectedCategory !== 'All' ? `&category=${selectedCategory}` : ''}` : '#'}
                            className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all ${currentPage >= totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:shadow-xl hover:translate-x-1'
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
