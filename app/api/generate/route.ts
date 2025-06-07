import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiBase = process.env.OPENAI_API_BASE;

  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({ error: "OPENAI_API_KEY is not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!apiBase) {
    return new NextResponse(
      JSON.stringify({ error: "OPENAI_API_BASE is not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = new URL("/v1/images/generations", apiBase).toString();

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new NextResponse(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

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
      return new NextResponse(
        JSON.stringify({ error: `Failed to generate image: ${response.statusText}`, details: errorBody }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    if (!data.data || !data.data[0] || !data.data[0].url) {
        console.error("Unexpected API response structure:", data);
        return new NextResponse(
            JSON.stringify({ error: "Unexpected API response structure" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
    
    return NextResponse.json({ imageUrl: data.data[0].url });

  } catch (error) {
    console.error("Error in generate API route:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: "Failed to process request", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
} 