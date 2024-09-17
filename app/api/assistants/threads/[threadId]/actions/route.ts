import { openai } from "@/app/openai";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { toolCallOutputs, runId } = await request.json();

  const stream = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "system", content: "You are processing tool outputs." },
      { role: "user", content: JSON.stringify(toolCallOutputs) }
    ],
    stream: true,
  });

  // 将 OpenAI 的流转换为 Web API 的 ReadableStream
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(chunk.choices[0]?.delta?.content || '');
      }
      controller.close();
    },
  });

  return new Response(readableStream);
}
