import Link from "next/link"
import type { Metadata } from "next"
import { ArrowDown, ArrowRight, Download } from "lucide-react"
import { absoluteUrl, siteConfig } from "@/lib/site"

const outcomes = [
  ["01", "Start clean", "Know what to give an agent before it writes a line."],
  ["02", "Stay in control", "Split work between agents without losing the bigger picture."],
  ["03", "Ship with proof", "Use a small review loop so fast code does not become fragile code."],
]

export const metadata: Metadata = {
  title: "AI-Native Engineering Playbook | Free Guide for Developers",
  description: "A free 30-page beginner-friendly guide to building with Claude Code and Codex: context, subagents, diagrams, and production habits.",
  alternates: { canonical: "/ai-native-engineering-playbook" },
  openGraph: {
    title: "The AI-Native Engineering Playbook",
    description: "A practical, beginner-friendly guide to building with coding agents without blindly trusting them.",
    url: "/ai-native-engineering-playbook",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The AI-Native Engineering Playbook",
    description: "A practical guide to coding agents, context engineering, and safe production workflows.",
  },
}

function WorkflowDiagram() {
  return (
    <div className="border bg-background p-4 sm:p-6" aria-label="A simple AI coding workflow: brief, context, agent, review, and ship">
      <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-muted-foreground">
        <span>ONE SMALL FEATURE</span><span>HUMAN OWNS THE RESULT</span>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_28px_1fr_28px_1fr] sm:items-center">
        <div className="border-2 border-foreground p-4">
          <p className="text-[10px] font-bold tracking-wider text-muted-foreground">1 / BRIEF</p>
          <p className="mt-2 text-sm font-bold">What should change?</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Goal, limits, and a clear finish line.</p>
        </div>
        <ArrowRight className="mx-auto hidden h-4 w-4 text-muted-foreground sm:block" />
        <ArrowDown className="mx-auto h-4 w-4 text-muted-foreground sm:hidden" />
        <div className="border border-foreground p-4">
          <p className="text-[10px] font-bold tracking-wider text-muted-foreground">2 / AGENT</p>
          <p className="mt-2 text-sm font-bold">Do the small job.</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Use the right files and context, not guesses.</p>
        </div>
        <ArrowRight className="mx-auto hidden h-4 w-4 text-muted-foreground sm:block" />
        <ArrowDown className="mx-auto h-4 w-4 text-muted-foreground sm:hidden" />
        <div className="border-2 border-foreground bg-foreground p-4 text-background">
          <p className="text-[10px] font-bold tracking-wider text-background/60">3 / REVIEW</p>
          <p className="mt-2 text-sm font-bold">Check. Test. Ship.</p>
          <p className="mt-1 text-xs leading-5 text-background/70">You decide what is safe to merge.</p>
        </div>
      </div>
    </div>
  )
}

function HeroAgentLoop() {
  return (
    <div className="playbook-agent-flow relative mx-auto w-full max-w-[390px] overflow-hidden border bg-background p-5 sm:p-6" aria-label="An animated workflow showing a feature request moving through context, an AI coding agent, and human review">
      <div className="flex items-center justify-between border-b pb-4 text-[10px] font-bold tracking-[0.14em] text-muted-foreground"><span>ONE FEATURE</span><span>ONE CHECKED CHANGE</span></div>
      <div className="relative mt-7 grid gap-3">
        <div className="flow-rail absolute bottom-6 left-[17px] top-6 w-px bg-border" />
        <div className="flow-signal absolute left-[13px] top-6 h-2 w-2 rounded-full bg-foreground" />
        <div className="relative ml-8 border bg-muted/40 p-3">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">REQUEST</p>
          <p className="mt-1 text-sm font-bold">“Add a safe export button”</p>
        </div>
        <div className="relative ml-8 border bg-background p-3">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">CONTEXT PACKET</p>
          <div className="mt-2 flex gap-1.5"><span className="flow-chip">files</span><span className="flow-chip">rules</span><span className="flow-chip">test</span></div>
        </div>
        <div className="relative ml-8 border-2 border-foreground bg-foreground p-3 text-background">
          <p className="text-[10px] font-bold tracking-[0.12em] text-background/60">AGENT</p>
          <p className="mt-1 font-mono text-sm font-bold">plan → diff</p>
        </div>
        <div className="relative ml-8 border bg-background p-3">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">HUMAN REVIEW</p>
          <div className="mt-2 flex items-center gap-2 text-xs font-bold"><span className="grid h-4 w-4 place-items-center border border-foreground text-[10px]">✓</span> tests pass · change understood</div>
        </div>
      </div>
    </div>
  )
}

export default function PlaybookLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "The AI-Native Engineering Playbook",
    description: "A free 30-page beginner-friendly guide to building with Claude Code and Codex.",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: absoluteUrl("/ai-native-engineering-playbook"),
    inLanguage: "en",
    isAccessibleForFree: true,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: 30,
  }

  return (
    <main>
      <script id="playbook-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section data-analytics-section="Playbook hero" className="mx-auto max-w-[1100px] px-4 pb-24 pt-16 sm:px-5 md:pb-32 md:pt-28">
        <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">FREE PLAYBOOK · 30 PAGES</p>
        <div className="mt-7 grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-[-0.055em] sm:text-6xl md:text-7xl">Work with AI.<br />Still think for yourself.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">A small field guide for using Claude Code or Codex on real work—without blindly accepting the output.</p>
          </div>
          <HeroAgentLoop />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href="/playbooks/ai-native-engineer-playbook.pdf" download data-analytics-event="playbook_download" className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">
            <Download className="h-4 w-4" /> Download the PDF
          </a>
          <a href="#outcomes" className="text-sm font-bold underline underline-offset-4">See the outcomes</a>
          <span className="text-xs text-muted-foreground">No email. No signup.</span>
        </div>
        <p className="mt-7 max-w-xl border-l-2 border-foreground pl-4 text-sm leading-6 text-muted-foreground">Built from real agent sessions while shipping software for an Indian startup with 100,000+ paying customers.</p>
      </section>

      <section id="outcomes" data-analytics-section="Playbook outcomes" className="border-y bg-muted/35">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-5 md:py-24">
          <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">WHAT CHANGES AFTER READING IT</p>
          <div className="mt-8 grid gap-0 border-y md:grid-cols-3 md:divide-x">
            {outcomes.map(([number, title, description]) => (
              <div key={number} className="border-b px-0 py-7 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0">
                <p className="font-mono text-xs text-muted-foreground">{number}</p>
                <h2 className="mt-4 text-xl font-bold">{title}</h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-analytics-section="Playbook workflow" className="mx-auto max-w-[1100px] px-4 py-20 sm:px-5 md:py-32">
        <div className="grid gap-9 md:grid-cols-[0.75fr_1.25fr] md:items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">THE CORE IDEA</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">The agent is a teammate, not a slot machine.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Give it a small job, useful context, and a way to prove it worked. The playbook shows the exact loop.</p>
          </div>
          <WorkflowDiagram />
        </div>
      </section>

      <section data-analytics-section="Playbook contents" className="border-t">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 py-16 sm:px-5 md:grid-cols-[0.7fr_1.3fr] md:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">INSIDE</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Only the useful parts.</h2>
          </div>
          <div className="grid gap-3 text-sm leading-6">
            <p className="border-b pb-3"><strong>Context packets</strong> — what to give an agent before asking it to act.</p>
            <p className="border-b pb-3"><strong>Subagents</strong> — when separate research, building, and review helps.</p>
            <p className="border-b pb-3"><strong>Graph thinking</strong> — how to map files, rules, and dependencies simply.</p>
            <p className="border-b pb-3"><strong>Review checklists</strong> — how to catch mistakes before they become production problems.</p>
          </div>
        </div>
      </section>

      <section data-analytics-section="Playbook call to action" className="border-t bg-foreground text-background">
        <div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-8 px-4 py-16 sm:px-5 md:flex-row md:items-end md:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-background/55">YOUR NEXT FEATURE IS ENOUGH</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight">Build it with more clarity.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/playbooks/ai-native-engineer-playbook.pdf" download data-analytics-event="playbook_download" className="inline-flex items-center gap-2 bg-background px-5 py-3 text-sm font-bold text-foreground"><Download className="h-4 w-4" /> Download PDF</a>
            <Link href="/blog/ai-native-engineering-playbook-2026" className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">Read the story <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
