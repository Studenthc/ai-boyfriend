import "./globals.css";
import { assistantId } from "./assistant-config";
import { Metadata } from 'next';
import GoogleAnalytics from './GoogleAnalytics';
import { Suspense } from 'react';
import PageViewTracker from './components/PageViewTracker';

// export const metadata: Metadata = {
//   title: "BestAIBoy.com | Your Perfect AI Boyfriend Experience",
//   description: "Discover your ideal AI boyfriend at BestAIBoy.com. Engage in meaningful conversations, receive emotional support, and explore a new dimension of companionship with our advanced AI technology.",
//   icons: {
//     icon: "/icon.png",
//   },
//   alternates: {
//     canonical: 'https://bestaiboy.com',
//   },
// };

export const metadata: Metadata = {
  title: "BestAIBoy.com | Your Perfect AI Boyfriend Experience",
  description: "Discover your ideal AI boyfriend at BestAIBoy.com. Engage in meaningful conversations, receive emotional support, and explore a new dimension of companionship with our advanced AI technology.",
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: 'https://bestaiboy.com',
  },
  openGraph: {
    title: 'BestAIBoy.com | Your Perfect AI Boyfriend Experience',
    description: 'Engage in meaningful conversations with your AI boyfriend. Experience companionship and emotional support through our advanced AI technology.',
    url: 'https://bestaiboy.com',
    siteName: 'BestAIBoy.com',
    images: [
      {
        url: 'https://bestaiboy.com/og-image.jpg', // 确保添加一个Open Graph图片
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestAIBoy.com | Your Perfect AI Boyfriend Experience',
    description: 'Engage in meaningful conversations with your AI boyfriend. Experience companionship and emotional support through our advanced AI technology.',
    images: ['https://bestaiboy.com/twitter-image.jpg'], // 确保添加一个Twitter卡片图片
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-45DCLSPB1L" />
        {assistantId && (
          <Suspense fallback={null}>
            <PageViewTracker GA_MEASUREMENT_ID="G-45DCLSPB1L" />
          </Suspense>
        )}
      </body>
    </html>
  );
}