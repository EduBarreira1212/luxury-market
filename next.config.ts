import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd16z39zkx8cl7p.cloudfront.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
