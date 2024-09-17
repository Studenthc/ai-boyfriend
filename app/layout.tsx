import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
import { Metadata } from 'next';
import GoogleAnalytics from './GoogleAnalytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BestAIBoy.com | Your Perfect AI Boyfriend Experience",
  description: "Discover your ideal AI boyfriend at BestAIBoy.com. Engage in meaningful conversations, receive emotional support, and explore a new dimension of companionship with our advanced AI technology.",
  icons: {
    icon: "/icon.png",
  },
  // 添加 canonical URL
  alternates: {
    canonical: 'https://www.bestaiboy.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {assistantId ? children : <Warnings />}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-QGRYFWK2JN" />
      </body>
    </html>
  );
}
