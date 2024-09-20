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
    async redirects() {
        return [
            {
                source: 'https://www.bestaiboy.com/:path*',
                destination: 'https://bestaiboy.com/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;