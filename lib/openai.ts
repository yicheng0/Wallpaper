export async function generateImage(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const apiBase = process.env.NEXT_PUBLIC_OPENAI_API_BASE;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_OPENAI_API_KEY is not set in .env.local");
  }

  if (!apiBase) {
    throw new Error("NEXT_PUBLIC_OPENAI_API_BASE is not set in .env.local");
  }

  const url = new URL("/v1/images/generations", apiBase).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenAI API Error:", errorBody);
    throw new Error(`Failed to generate image: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.data || !data.data[0] || !data.data[0].url) {
    console.error("Unexpected API response structure:", data);
    throw new Error("Unexpected API response structure");
  }

  return data.data[0].url;
} 