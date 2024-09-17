/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['example.com'], // Add any domains you're loading images from
    },
};

export default nextConfig;


