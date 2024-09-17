import { messageStore } from '@/app/lib/messageStore';
import { v4 as uuidv4 } from 'uuid';

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const threadId = uuidv4();
  messageStore.createThread(threadId);
  return Response.json({ threadId });
}
