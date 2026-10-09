"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Download, Eye, FileText, LogOut, Mail, MousePointerClick, Users } from "lucide-react"

type DashboardData = {
  configured: boolean
  summary?: { pageViews: number; sessions: number; downloads: number; leads: number }
  topPages?: { _id: string; views: number }[]
  topSections?: { _id: string; views: number }[]
  scrollDepth?: { _id: number; hits: number }[]
  dailyTraffic?: { _id: string; views: number }[]
  recentJourneys?: { _id: string; lastSeen: string; journey: { type: string; path: string; section?: string; value?: number; label?: string }[] }[]
  recentContacts?: { _id: string; name: string; email: string; subject: string; createdAt: string; emailSent: boolean }[]
}

const cards = [
  { key: "pageViews", label: "Page views", icon: Eye },
  { key: "sessions", label: "Visitor sessions", icon: Users },
  { key: "downloads", label: "Playbook downloads", icon: Download },
  { key: "leads", label: "Captured leads", icon: Mail },
] as const

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then(async (response) => {
        if (response.status === 401) {
          router.replace("/admin/login")
          return null
        }
        if (!response.ok) throw new Error("Could not load analytics")
        return response.json()
      })
      .then((result) => result && setData(result))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load analytics"))
  }, [router])

  const maxDailyViews = useMemo(() => Math.max(1, ...(data?.dailyTraffic?.map((day) => day.views) || [1])), [data])

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
  }

  if (error) return <div className="container py-10 text-destructive">{error}</div>
  if (!data) return <div className="container py-10 text-muted-foreground">Loading analytics…</div>

  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full" style={{ maxWidth: "1200px" }}>
        <div className="mb-8 flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground">LAST 30 DAYS</p>
          <h1 className="mt-1 text-3xl font-bold">Website analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Anonymous visitor behavior, playbook interest, and contact leads.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 border px-3 py-2 text-sm font-medium hover:bg-muted"><FileText className="h-4 w-4" /> Blog</Link>
          <button onClick={logout} className="inline-flex items-center gap-1.5 border px-3 py-2 text-sm font-medium hover:bg-muted"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </div>

        {!data.configured ? (
        <div className="border border-dashed p-6">
          <h2 className="font-bold">MongoDB is not connected yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Copy <code>.env.local.example</code> to <code>.env.local</code> and add your MongoDB details. The tracker is already running; it will begin storing new events after configuration.</p>
        </div>
        ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ key, label, icon: Icon }) => (
              <div key={key} className="min-h-[126px] border bg-card p-5">
                <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs font-bold uppercase tracking-wide">{label}</span><Icon className="h-4 w-4" /></div>
                <p className="mt-3 text-3xl font-bold">{data.summary?.[key] ?? 0}</p>
              </div>
            ))}
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <Panel title="Traffic by day">
              {data.dailyTraffic?.length ? <><div className="flex h-40 items-end gap-1 border-b border-muted-foreground/20">
                {data.dailyTraffic.map((day) => <div key={day._id} title={`${day._id}: ${day.views} views`} className="flex h-full flex-1 flex-col justify-end"><div className="min-h-[4px] bg-primary transition-all" style={{ height: `${Math.max(4, (day.views / maxDailyViews) * 100)}%` }} /></div>)}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{data.dailyTraffic[0]?._id}</span><span>{data.dailyTraffic[data.dailyTraffic.length - 1]?._id}</span></div></> : <Empty text="No public page views recorded yet." />}
              <p className="mt-3 text-xs text-muted-foreground">Each bar is one day. Hover a bar for its view count.</p>
            </Panel>
            <Panel title="How far people scroll">
              <div className="space-y-3">
                {[25, 50, 75, 100].map((depth) => {
                  const hits = data.scrollDepth?.find((item) => item._id === depth)?.hits || 0
                  const percentage = data.summary?.sessions ? Math.round((hits / data.summary.sessions) * 100) : 0
                  return <div key={depth}><div className="mb-1 flex justify-between text-sm"><span>{depth}% of page</span><span className="text-muted-foreground">{hits} events · {percentage}% of sessions</span></div><div className="h-2 bg-muted"><div className="h-full bg-primary" style={{ width: `${Math.min(100, percentage)}%` }} /></div></div>
                })}
              </div>
            </Panel>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <RankedList title="Most visited pages" empty="No page views recorded yet." items={data.topPages?.map((item) => ({ label: item._id, value: item.views })) || []} />
            <RankedList title="Sections people viewed" empty="No section views recorded yet." items={data.topSections?.map((item) => ({ label: item._id || "Unnamed section", value: item.views })) || []} />
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <Panel title="Recent visitor journeys">
              <div className="space-y-3">
                {data.recentJourneys?.length ? data.recentJourneys.map((journey) => <div key={journey._id} className="border p-3"><p className="text-xs text-muted-foreground">{new Date(journey.lastSeen).toLocaleString()}</p><p className="mt-1 text-sm">{journey.journey.slice(0, 8).map((event) => event.type === "section_view" ? event.section : event.type === "scroll_depth" ? `${event.value}% scroll` : event.type === "download" ? `Downloaded: ${event.label}` : event.path).filter(Boolean).join(" → ")}</p></div>) : <Empty text="No journeys recorded yet." />}
              </div>
            </Panel>
            <Panel title="Recent contact messages">
              <div className="space-y-3">
                {data.recentContacts?.length ? data.recentContacts.map((contact) => <a key={contact._id} href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`} className="block border p-3 hover:bg-muted"><div className="flex items-center justify-between gap-3"><strong>{contact.name}</strong><span className="text-xs text-muted-foreground">{new Date(contact.createdAt).toLocaleDateString()}</span></div><p className="text-sm">{contact.subject}</p><p className="text-xs text-muted-foreground">{contact.email} · {contact.emailSent ? "email alert sent" : "saved"}</p></a>) : <Empty text="No contact messages yet." />}
              </div>
            </Panel>
          </section>
        </>
      )}
      </div>
    </main>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="min-h-[220px] border bg-card p-5"><div className="mb-5 flex items-center gap-2"><MousePointerClick className="h-4 w-4" /><h2 className="font-bold">{title}</h2></div>{children}</div>
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text}</p>
}

function RankedList({ title, items, empty }: { title: string; items: { label: string; value: number }[]; empty: string }) {
  return <Panel title={title}>{items.length ? <ol className="divide-y border-y">{items.map((item, index) => <li key={item.label} className="flex items-center justify-between gap-4 py-2 text-sm"><span><span className="mr-2 text-muted-foreground">{index + 1}.</span>{item.label}</span><strong>{item.value}</strong></li>)}</ol> : <Empty text={empty} />}</Panel>
}
