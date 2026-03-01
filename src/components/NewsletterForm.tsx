'use client';

import React, { useState } from 'react';

/**
 * Newsletter Form Component
 * Handles the logic for joining the community and bọc Server Actions (optional).
 */
export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Giả lập xử lý server
        setTimeout(() => {
            console.log('Newsletter signup:', email);
            setStatus('success');
        }, 1000);
    };

    if (status === 'success') {
        return (
            <div className="text-green-200 font-medium animate-in fade-in zoom-in duration-300">
                Welcome to the community! Check your inbox soon.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-green-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-[#4F7942] px-8 py-4 rounded-full font-bold hover:bg-gray-100 disabled:opacity-50 transition-all whitespace-nowrap"
            >
                {status === 'loading' ? 'Joining...' : 'Join Now'}
            </button>
        </form>
    );
}
