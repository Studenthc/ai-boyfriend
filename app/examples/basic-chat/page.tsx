import { Metadata } from 'next'
import ChatContent from './ChatContent'

export const metadata: Metadata = {
  title: 'Chat with AI Boyfriend | BestAIBoy.com',
  description: 'Engage in a meaningful conversation with your AI boyfriend. Experience companionship and emotional support through our advanced AI technology.',
  alternates: {
    canonical: 'https://bestaiboy.com/examples/basic-chat',
  },
  openGraph: {
    title: 'Chat with AI Boyfriend | BestAIBoy.com',
    description: 'Experience companionship and emotional support with our AI boyfriend.',
    url: 'https://bestaiboy.com/examples/basic-chat',
    siteName: 'BestAIBoy.com',
    images: [
      {
        url: 'https://bestaiboy.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with AI Boyfriend | BestAIBoy.com',
    description: 'Experience companionship and emotional support with our AI boyfriend.',
    images: ['https://bestaiboy.com/twitter-image.jpg'],
  },
}

export default function BasicChatPage() {
  return (
    <>
      <h1 className="sr-only">Chat with AI Boyfriend</h1>
      <h3 className="text-2xl font-semibold mb-4 text-center">Chat with Your AI Boyfriend</h3>
      <ChatContent />
    </>
  )
}