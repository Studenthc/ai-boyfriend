/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    images: {
        domains: ['example.com'], // Add any domains you're loading images from
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.bestaiboy.com',
                    },
                ],
                destination: 'https://bestaiboy.com/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;