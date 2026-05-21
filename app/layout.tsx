import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Milestone Global IT Limited — AI Agent Services for Local Businesses',
  description:
    'Milestone Global IT Limited provides AI Chatbots, Workflow Automation, AI Consulting, and Custom AI Agent Development for UK businesses.',
  keywords:
    'AI agents, AI chatbots, workflow automation, AI consulting, UK AI company, Milestone Global IT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-mgil-bg text-slate-200 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
