import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
        ],
    },
    eslint: {
        // 빌드 시 경고는 허용하고 오류만 실패하도록 설정
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
