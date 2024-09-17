import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
  const assistant = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Create a new assistant" }
    ],
  });

  return Response.json({ assistantId: assistant.id });
}
