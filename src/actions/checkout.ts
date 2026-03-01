'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Data Lineage Hook (OLAP Foundation)
 */
async function trackEvent(eventName: string, payload: any) {
    // Tích hợp Kafka, BigQuery streaming hoặc GA4 Measurement Protocol tại đây
    console.log(`[Telemetry] ${eventName}:`, JSON.stringify(payload));
}

export interface CheckoutResponse {
    success: boolean;
    orderId?: string;
    error?: string;
}

/**
 * Server Action xử lý Checkout áp dụng Pessimistic Locking.
 * Flow: Client -> Server Action -> Supabase RPC -> PostgreSQL Transaction.
 */
export async function processCheckout(
    cartPayload: Array<{ productId: string; quantity: number }>,
    shippingAddress: string
): Promise<CheckoutResponse> {
    try {
        // 1. Khởi tạo kết nối Supabase có xác thực (Session-aware)
        const supabase = await createClient();

        // 2. [Security] Lấy User ID trực tiếp từ Server Session, KHÔNG tin tưởng tham số userId từ Client
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            throw new Error('Unauthorized: Vui lòng đăng nhập để thanh toán.');
        }

        const userId = user.id;

        // 3. Telemetry: Ghi nhận bắt đầu transaction
        await trackEvent('checkout_started', { userId, itemCount: cartPayload.length });

        // 4. Kích hoạt Remote Procedure Call (RPC)
        // Hệ thống sẽ đẩy array cartPayload dưới dạng JSONB vào PostgreSQL.
        const { data: orderId, error: rpcError } = await supabase.rpc('process_order_securely', {
            p_user_id: userId,
            p_cart_items: cartPayload,
            p_shipping_address: shippingAddress
        });

        // 5. Xử lý kết quả trả về từ PostgreSQL Transaction
        if (rpcError) {
            // Lỗi ở đây có thể do trigger RAISE EXCEPTION trong PL/pgSQL (VD: Hết tồn kho)
            console.error('[DB Transaction Error]:', rpcError);
            throw new Error(rpcError.message || 'Lỗi hệ thống khi xử lý đơn hàng.');
        }

        // 6. Telemetry: Ghi nhận Transaction thành công, chuẩn bị dữ liệu cho OLAP
        await trackEvent('checkout_completed', {
            userId,
            orderId,
            status: 'SUCCESS'
        });

        return {
            success: true,
            orderId: orderId as string, // UUID trả về từ Database
        };

    } catch (error: any) {
        console.error('[Checkout Action Error]:', error);

        await trackEvent('checkout_failed', {
            error: error.message
        });

        return {
            success: false,
            error: error.message || 'Đã xảy ra lỗi không xác định trong quá trình thanh toán.',
        };
    }
}
