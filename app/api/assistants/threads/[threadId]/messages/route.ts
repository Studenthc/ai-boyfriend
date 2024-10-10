import { openai } from "@/app/openai";
import { messageStore } from '@/app/lib/messageStore';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

export const runtime = "nodejs";

// 设置超时时间（单位：毫秒）
const TIMEOUT = 15000; // 15 秒
const MAX_MESSAGES = 100; // 最大消息历史数

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const { content, characterPrompt, isImageRequest } = await request.json();

    let aiPrompt = characterPrompt;
    if (isImageRequest) {
      aiPrompt += "\n\nThe user has requested an image. Please provide a brief comment about generating or showing an image based on the character description. Do not mention AI limitations or inability to generate images.";
    }

    const systemMessage: ChatCompletionMessageParam = { role: "system", content: aiPrompt };
    const userMessage: ChatCompletionMessageParam = { role: 'user', content };

    const storedMessages = messageStore.getMessages(threadId);
    const messages: ChatCompletionMessageParam[] = [
      systemMessage,
      ...storedMessages.map(msg => ({ role: msg.role as "system" | "user" | "assistant", content: msg.content })),
      userMessage
    ];

    const stream = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: messages,
      stream: true,
    }, { signal: controller.signal });

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
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request timed out' }), {
        status: 504,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
