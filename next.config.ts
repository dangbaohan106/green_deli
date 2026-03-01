import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cấu hình Whitelist cho Next.js Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Cho phép mọi đường dẫn từ domain này
      },
      // Bạn có thể thêm các domain khác sau này (ví dụ: Supabase Storage)
      // {
      //   protocol: 'https',
      //   hostname: 'xxxxxxx.supabase.co',
      //   port: '',
      //   pathname: '/storage/v1/object/public/**',
      // },
    ],
  },
};

export default nextConfig;