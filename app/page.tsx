import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react"
import { blogs } from "@/data/blogs"
import { projects } from "@/data/projects"
import { Metadata } from "next"
import profileImage from "../assets/abhishekraj.png"
import { PlaybookEmailGate } from "@/components/playbook-email-gate"

export const metadata: Metadata = {
  title: "Abhishek Raj | Software Developer",
  description: "Abhishek Raj builds tax engines, browser automations, scraping systems, and AI products.",
  alternates: { canonical: "/" },
}

const work = [
  { context: "REGISTERKARO", title: "Browser automation", description: "Authenticated flows with login and CAPTCHA steps for tens of thousands of client services annually — saving hundreds of manual hours every week." },
  { context: "REGISTERKARO", title: "Tax & compliance engines", description: "Filing deadlines, GST-frequency rules, and 20+ service configurations across company types and registrations." },
  { context: "REGISTERKARO", title: "Operations & AI", description: "Directly contributed to migrating 50K+ clients from WhatsApp and spreadsheets into internal ERP and customer-facing apps, with the new workflows used by 500+ employees daily; also built subscription, MCA/GST, and AI workflows." },
  { context: "CLOUD & DEPLOYMENT", title: "Shipping to production", description: "AWS and S3-compatible object storage, Vercel deployments, Docker, and Linux VPS/Hostinger hosting for production applications." },
  { context: "PERSONAL BUILDING", title: "AI tools for developers", description: "StackContext turns browser work into structured context for coding agents, while claude-says makes long agent runs easier to follow." },
  { context: "PERSONAL BUILDING", title: "AI-powered capture", description: "Scrible turns meetings into transcripts, summaries, decisions, and action items; FindMyFlat uses scraping and filtering to make rental search more useful." },
]

const featuredProjectTitles = new Set([
  "StackContext",
  "Scrible",
  "FindMyFlat",
  "claude-says",
  "Terminal Coffee",
  "Awaaz Delhi",
])

const socialLinks = [
  { href: "https://github.com/abhishek141001", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/abhishek-raj-69b55a230/", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/ojhaabhishekraj", label: "X", icon: Twitter },
]

const reading = [
  {
    title: "Building Effective AI Agents",
    source: "Anthropic Engineering",
    note: "Useful patterns for deciding when a workflow is enough and when an agent is actually warranted.",
    href: "https://www.anthropic.com/engineering/building-effective-agents",
  },
  {
    title: "Writing effective tools for AI agents",
    source: "Anthropic Engineering",
    note: "Clear principles for tool boundaries, evaluation, and context design.",
    href: "https://www.anthropic.com/engineering/writing-tools-for-agents",
  },
  {
    title: "chrome.tabCapture",
    source: "Chrome for Developers",
    note: "The browser audio-capture API behind products such as Scrible.",
    href: "https://developer.chrome.com/docs/extensions/reference/api/tabCapture",
  },
  {
    title: "Demystifying evals for AI agents",
    source: "Anthropic Engineering",
    note: "How to test agent behavior before a workflow reaches production.",
    href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
  },
]

export default function Home() {
  const latestPosts = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
  const featuredProjects = projects.filter((project) => featuredProjectTitles.has(project.title))

  return (
    <main className="mx-auto max-w-[1100px] px-3 py-5 text-[13px] leading-5 sm:px-5">
      <section className="border-b pb-5">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={profileImage}
              alt="Abhishek Raj"
              width={48}
              height={48}
              className="h-full w-full scale-[1.08] object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ABHISHEK RAJ / SOFTWARE DEVELOPER / NEW DELHI</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              I build software that makes complex work less manual.
            </h1>
            <p className="mt-1 max-w-3xl text-muted-foreground">
              Tax engines, browser automations, scraping systems, and AI products. Currently building compliance tech at RegisterKaro.
            </p>
          </div>
        </div>
        <PlaybookEmailGate />
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
              <Icon className="h-3.5 w-3.5" /> {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-5">
        <h2 className="font-bold">What I do</h2>
        <ol className="mt-2 divide-y border-y">
          {work.map(({ context, title, description }, index) => (
            <li key={title} className="grid gap-1 py-2 sm:grid-cols-[2rem_7.5rem_12rem_minmax(0,1fr)] sm:gap-3">
              <span className="text-muted-foreground">{index + 1}.</span>
              <span className="text-[10px] font-bold tracking-wide text-primary">{context}</span>
              <strong>{title}</strong>
              <span className="text-muted-foreground">{description}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-bold">Selected projects</h2>
          <Link href="/projects" className="text-primary hover:underline">all projects →</Link>
        </div>
        <ol className="mt-2 divide-y border-y">
          {featuredProjects.map((project, index) => {
            const href = project.liveUrl || project.githubUrl
            return (
              <li key={project.title} className="grid gap-1 py-2 sm:grid-cols-[2rem_minmax(12rem,0.35fr)_minmax(0,1fr)_auto] sm:gap-3">
                <span className="text-muted-foreground">{index + 1}.</span>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                    {project.title}
                  </a>
                ) : <strong>{project.title}</strong>}
                <span className="text-muted-foreground">{project.description}</span>
                <span className="whitespace-nowrap text-xs text-muted-foreground">{project.technologies.slice(0, 3).join(" · ")}</span>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="border-y py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-bold">Writing</h2>
          <Link href="/blog" className="text-primary hover:underline">all posts →</Link>
        </div>
        <ol className="mt-2">
          {latestPosts.map((post, index) => (
            <li key={post.slug} className="py-1">
              <span className="mr-1 text-muted-foreground">{index + 1}.</span>
              <Link href={`/blog/${post.slug}`} className="font-medium text-primary hover:underline">{post.title}</Link>
              <span className="ml-2 text-xs text-muted-foreground">
                ({new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })})
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-5">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-bold">Reading shelf</h2>
            <p className="text-xs text-muted-foreground">Resources I&apos;m exploring around agents, browser tooling, and reliable AI products.</p>
          </div>
        </div>
        <ol className="mt-2 divide-y border-y">
          {reading.map((item, index) => (
            <li key={item.href} className="grid gap-1 py-2 sm:grid-cols-[2rem_minmax(12rem,0.35fr)_minmax(0,1fr)_10rem] sm:gap-3">
              <span className="text-muted-foreground">{index + 1}.</span>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                {item.title} <ArrowUpRight className="inline h-3 w-3" />
              </a>
              <span className="text-muted-foreground">{item.note}</span>
              <span className="text-xs text-muted-foreground">{item.source}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="py-5 text-muted-foreground">
        Built from real work, not tutorial clones. <Link href="/contact" className="text-primary hover:underline">Let&apos;s talk</Link>.
      </p>
    </main>
  )
}
