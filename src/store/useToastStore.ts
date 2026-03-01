import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastState {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

/**
 * Zustand store for managing global toast notifications.
 */
export const useToastStore = create<ToastState>((set) => ({
    toasts: [],

    /**
     * Adds a new toast and automatically removes it after a delay.
     */
    addToast: (message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);

        set((state) => ({
            toasts: [...state.toasts, { id, message, type }]
        }));

        // Auto remove after 3 seconds
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id)
            }));
        }, 3000);
    },

    removeToast: (id: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }));
    }
}));
