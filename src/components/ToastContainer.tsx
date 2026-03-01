'use client';

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * A floating container that renders all active toasts.
 * Positioned fixed at the top-right of the screen.
 */
export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-100 px-5 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] min-w-[320px] animate-in slide-in-from-right-10 fade-in duration-300 transition-all border-l-4"
                    style={{
                        borderLeftColor:
                            toast.type === 'success' ? '#4F7942' :
                                toast.type === 'error' ? '#EF4444' : '#3B82F6'
                    }}
                >
                    <div className="shrink-0">
                        {toast.type === 'success' && <CheckCircle size={20} className="text-[#4F7942]" />}
                        {toast.type === 'error' && <AlertCircle size={20} className="text-red-500" />}
                        {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
                    </div>

                    <div className="flex-1 text-sm font-medium text-[#2D2D2D]">
                        {toast.message}
                    </div>

                    <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
