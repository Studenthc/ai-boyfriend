import { Metadata } from 'next';
import ChatContent from './ChatContent';

export const metadata: Metadata = {
  title: 'Chat with AI Boyfriend | BestAIBoy.com',
  description: 'Engage in a meaningful conversation with your AI boyfriend. Experience companionship and emotional support through our advanced AI technology.',
  alternates: {
    canonical: 'https://www.bestaiboy.com/examples/basic-chat',
  },
};

export default function BasicChatPage() {
  return <ChatContent />;
}