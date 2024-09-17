// import { assistantId, systemPrompt } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import { messageStore } from '@/app/lib/messageStore';

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  try {
    const { content, characterPrompt } = await request.json();

    // Add user message to the store
    messageStore.addMessage(threadId, { role: 'user', content });

    // Get all messages for this thread
    const messages = messageStore.getMessages(threadId);

    const stream = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        { role: "system", content: characterPrompt },
        ...messages
      ],
      stream: true,
    });

    let assistantResponse = '';

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            assistantResponse += content;
            controller.enqueue(content);
          }
          // Add assistant message to the store after full response
          messageStore.addMessage(threadId, { role: 'assistant', content: assistantResponse });
          controller.close();
        } catch (error) {
          console.error('Error processing stream:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream);
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
