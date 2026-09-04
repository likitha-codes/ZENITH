import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.FEATHERLESS_API_KEY,
  baseURL: process.env.FEATHERLESS_BASE_URL,
});

export async function askFeatherless(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: process.env.FEATHERLESS_MODEL!,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? "";
}