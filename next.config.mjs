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
                source: '/search/fb.php',
                destination: '/',
                permanent: true,
            },
            {
                source: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
                destination: '/',
                permanent: true,
            },
            {
                source: '/parking.php',
                destination: '/',
                permanent: true,
            },
            {
                source: '/search/tsc.php',
                destination: '/',
                permanent: true,
            },
            {
                source: '/search/cc.php',
                destination: '/',
                permanent: true,
            },
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