import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
import { Metadata } from 'next';
import GoogleAnalytics from './GoogleAnalytics';
import { Suspense } from 'react';
import PageViewTracker from './components/PageViewTracker';

export const metadata: Metadata = {
  title: "BestAIBoy.com | Your Perfect AI Boyfriend Experience",
  description: "Discover your ideal AI boyfriend at BestAIBoy.com. Engage in meaningful conversations, receive emotional support, and explore a new dimension of companionship with our advanced AI technology.",
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: 'https://bestaiboy.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {assistantId ? children : <Warnings />}
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