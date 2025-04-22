import type { NextRequest } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { xai } from "@ai-sdk/xai"

// Set max duration for streaming responses
export const maxDuration = 60

export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  const { messages } = await req.json()
  const provider = params.provider

  try {
    switch (provider) {
      case "openai":
        return handleOpenAI(messages)
      case "anthropic":
        return handleAnthropic(messages)
      case "xai":
        return handleXAI(messages)
      // For demo purposes, we'll route other providers to OpenAI
      default:
        return handleOpenAI(messages)
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

async function handleOpenAI(messages: any[]) {
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  })

  return result.toDataStreamResponse()
}

async function handleAnthropic(messages: any[]) {
  const result = streamText({
    model: anthropic("claude-3-5-sonnet"),
    messages,
  })

  return result.toDataStreamResponse()
}

async function handleXAI(messages: any[]) {
  const result = streamText({
    model: xai("grok-2"),
    messages,
  })

  return result.toDataStreamResponse()
}
