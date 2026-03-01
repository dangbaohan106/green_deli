import React from 'react';
import Image from 'next/image';
import { Leaf, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
// Tách Form tương tác ra một Client Component riêng biệt để bảo toàn SSR cho trang chủ
import { NewsletterForm } from '@/components/NewsletterForm';
import { TrackedLink } from '@/components/TrackedLink'; // Component bọc thẻ <a> để bắn Data Lineage

export default function GreenDeliLanding() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#2D2D2D] font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center px-8 lg:px-24">
        <div className="z-10 max-w-2xl">
          <span className="text-sm uppercase tracking-[0.2em] text-[#4F7942] font-semibold mb-4 block">
            Premium Organic Selection
          </span>
          <h1 className="text-6xl lg:text-7xl font-serif leading-tight mb-6">
            Freshness delivered <br />
            <span className="italic">to your doorstep.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Sourced directly from certified local farms. Tailored for the health-conscious expat community in Vietnam.
          </p>
          <div className="flex gap-4">
            {/* Sử dụng TrackedLink để tự động bắn event 'cta_click' về Data Lake */}
            <TrackedLink href="/shop" eventName="hero_shop_now_click">
              <button className="bg-[#2D2D2D] text-white px-8 py-4 rounded-full hover:bg-[#4F7942] transition-all flex items-center gap-2">
                Shop Now <ArrowRight size={18} />
              </button>
            </TrackedLink>
            <TrackedLink href="/about" eventName="hero_our_story_click">
              <button className="border border-[#2D2D2D] px-8 py-4 rounded-full hover:bg-gray-50 transition-all">
                Our Story
              </button>
            </TrackedLink>
          </div>
        </div>

        {/* HERO IMAGE - Đã tối ưu bằng next/image */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FDFDFB] z-10" />
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
              alt="Fresh Organic Vegetables"
              fill
              priority /* Cực kỳ quan trọng: Báo cho browser load ảnh này đầu tiên (tối ưu LCP) */
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* --- TRUST BAR (Social Proof) --- */}
      <section className="py-12 border-y border-gray-100 bg-white px-8 lg:px-24 flex flex-wrap justify-between items-center gap-8">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Certified by</p>
        <div className="flex gap-12 grayscale opacity-60 italic font-serif text-xl">
          <span>USDA Organic</span>
          <span>EU Bio</span>
          <span>Global G.A.P</span>
          <span>VietGAP Premium</span>
        </div>
      </section>

      {/* --- FEATURES (Value Prop) --- */}
      <section className="py-24 px-8 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-16">
        <FeatureCard
          icon={<Leaf className="text-[#4F7942]" size={32} />}
          title="100% Organic"
          desc="No pesticides, no GMOs. Only pure nature on your plate."
        />
        <FeatureCard
          icon={<Truck className="text-[#4F7942]" size={32} />}
          title="Express Delivery"
          desc="Harvested at dawn, delivered by noon. Peak freshness guaranteed."
        />
        <FeatureCard
          icon={<ShieldCheck className="text-[#4F7942]" size={32} />}
          title="Expat Friendly"
          desc="English support and international quality standards."
        />
      </section>

      {/* --- FEATURED CATEGORIES --- */}
      <section className="py-12 px-8 lg:px-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-serif">Seasonal Collections</h2>
          <TrackedLink href="/categories" eventName="view_all_categories_click" className="text-[#4F7942] underline font-medium">
            View all categories
          </TrackedLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Leafy Greens', 'Root Vegetables', 'Fresh Fruits', 'Exotic Herbs'].map((cat) => (
            <TrackedLink key={cat} href={`/category/${cat.toLowerCase().replace(' ', '-')}`} eventName="category_card_click" eventPayload={{ category: cat }}>
              <div className="group cursor-pointer overflow-hidden rounded-2xl relative h-80 bg-gray-200">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="text-xl font-semibold">{cat}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-all">Explore Collection →</p>
                </div>
              </div>
            </TrackedLink>
          ))}
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="my-24 mx-8 lg:mx-24 bg-[#4F7942] rounded-[2rem] p-16 text-center text-white">
        <h2 className="text-4xl font-serif mb-4">Join the Green Community</h2>
        <p className="mb-8 text-green-100 max-w-md mx-auto">Get weekly recipes, farm updates and 10% off your first order.</p>

        {/* Delegate logic xử lý form (useState, Validation, Server Action) cho Client Component */}
        <NewsletterForm />
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-6 p-4 bg-green-50 rounded-2xl">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}