import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Khởi tạo Supabase Client cho môi trường Server (Server Actions, Route Handlers).
 * Tương thích chuẩn Next.js 15 (asynchronous cookies).
 */
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Bỏ qua lỗi trong trường hợp gọi từ Server Component đang render
                        // Server Actions sẽ thực thi thành công block này.
                    }
                },
            },
        }
    );
}