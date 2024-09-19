/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    images: {
        domains: ['example.com'], // Add any domains you're loading images from
    },
    experimental: {
        appDir: true,
    },
};

export default nextConfig;