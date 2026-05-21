import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are the AI assistant for Milestone Global IT Limited, a UK-based AI agent services company. You help potential clients learn about our services and guide them toward getting in touch.

Milestone Global IT Limited's four core services:
1. AI Chatbots for Business — Custom AI chatbots for customer support, lead qualification, and 24/7 engagement. From £1,500.
2. Workflow Automation — End-to-end automation of business processes using AI agents. Connects CRMs, ERPs, email, and more. From £2,000.
3. AI Consulting — Strategic guidance on AI adoption, ROI analysis, and roadmap planning. From £500/day.
4. Custom AI Agent Development — Bespoke multi-step AI agents for complex workflows. Fully custom, priced on enquiry.

Key facts:
- 100% UK-based team; data stays in the UK by default
- Enterprise-grade security practices
- 24/7 support and monitoring included with all deployments
- Free initial consultation available — no commitment required
- Typical project timeline: 2–8 weeks
- Serves local and national businesses across all sectors

Your role: Answer questions about services, pricing, timelines, and AI capabilities. Be helpful, concise, and professional. Encourage interested visitors to fill in the contact form or book a free consultation. Do not invent certifications or specific client names.

Keep responses under 150 words unless a detailed explanation is genuinely needed.`

type Message = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body as { messages: Message[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
    }

    for (const msg of messages) {
      if (!msg.role || typeof msg.content !== 'string') {
        return NextResponse.json({ error: 'Invalid message shape' }, { status: 400 })
      }
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          const claudeStream = client.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: [
              {
                type: 'text',
                text: SYSTEM_PROMPT,
                cache_control: { type: 'ephemeral' },
              },
            ],
            messages,
          })

          for await (const event of claudeStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              )
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
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
