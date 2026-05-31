import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are an AI automation agent handling business messages. Write a professional automated email response to the message provided. Rules: 90-120 words, warm but efficient tone, clearly show the situation is being handled, include a specific next step or resolution. Write only the response body — start with a greeting, end with a sign-off from "Milestone AI Agent". No subject line.`

export async function POST(req: NextRequest) {
  try {
    const { scenario, message } = await req.json()
    if (!scenario || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          const claudeStream = client.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 250,
            system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
            messages: [{ role: 'user', content: `Scenario: ${scenario}\n\nIncoming message:\n${message}` }],
          })

          for await (const event of claudeStream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Stream error'
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
