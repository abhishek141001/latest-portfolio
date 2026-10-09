import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!isMongoConfigured()) return NextResponse.json({ configured: false })

  const db = await getDb()
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const events = db.collection("analytics_events")
  const contacts = db.collection("contact_submissions")
  const playbookLeads = db.collection("playbook_leads")
  const publicEvent = { occurredAt: { $gte: since }, path: { $not: /^\/admin(?:\/|$)/ } }
  const [pageViews, sessions, contactLeads, playbookLeadCount, leadDocuments, topPages, topSections, scrollDepth, dailyTraffic, recentJourneys, recentContacts] = await Promise.all([
    events.countDocuments({ ...publicEvent, type: "page_view" }),
    events.distinct("sessionId", publicEvent).then((items) => items.length),
    contacts.countDocuments({ createdAt: { $gte: since } }),
    playbookLeads.countDocuments({ createdAt: { $gte: since } }),
    playbookLeads.find({ createdAt: { $gte: since } }, { projection: { email: 1, source: 1, createdAt: 1, lastRequestedAt: 1, downloadStartedAt: 1, sessionIds: 1, visitorIds: 1, lastSessionId: 1, lastVisitorId: 1 } }).sort({ lastRequestedAt: -1 }).limit(100).toArray(),
    events.aggregate([{ $match: { ...publicEvent, type: "page_view" } }, { $group: { _id: "$path", views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 8 }]).toArray(),
    events.aggregate([{ $match: { ...publicEvent, type: "section_view" } }, { $group: { _id: "$section", views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 8 }]).toArray(),
    events.aggregate([{ $match: { ...publicEvent, type: "scroll_depth" } }, { $group: { _id: { value: "$value", sessionId: "$sessionId" } } }, { $group: { _id: "$_id.value", hits: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray(),
    events.aggregate([{ $match: { ...publicEvent, type: "page_view" } }, { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$occurredAt" } }, views: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray(),
    events.aggregate([{ $match: publicEvent }, { $sort: { occurredAt: -1 } }, { $group: { _id: "$sessionId", lastSeen: { $first: "$occurredAt" }, journey: { $push: { type: "$type", path: "$path", section: "$section", value: "$value", label: "$label" } } } }, { $sort: { lastSeen: -1 } }, { $limit: 10 }]).toArray(),
    contacts.find({}, { projection: { name: 1, email: 1, subject: 1, createdAt: 1, emailSent: 1 } }).sort({ createdAt: -1 }).limit(10).toArray(),
  ])

  const recentPlaybookLeads = await Promise.all(leadDocuments.map(async (lead) => {
    const visitorIds = Array.isArray(lead.visitorIds) ? lead.visitorIds : lead.lastVisitorId ? [lead.lastVisitorId] : []
    const leadEvents = visitorIds.length
      ? await events.find({ ...publicEvent, visitorId: { $in: visitorIds } }, { projection: { type: 1, path: 1, section: 1, value: 1, label: 1, occurredAt: 1, sessionId: 1 } }).sort({ occurredAt: 1 }).limit(50).toArray()
      : []
    const pages = Array.from(new Set(leadEvents.filter((event) => event.type === "page_view").map((event) => event.path)))
    const maxScroll = Math.max(0, ...leadEvents.filter((event) => event.type === "scroll_depth").map((event) => event.value || 0))
    return {
      _id: lead._id,
      email: lead.email,
      source: lead.source || "homepage",
      createdAt: lead.createdAt,
      lastRequestedAt: lead.lastRequestedAt || lead.createdAt,
      sessions: Array.from(new Set(leadEvents.map((event) => event.sessionId))).length,
      pages,
      maxScroll,
      hasJourney: visitorIds.length > 0,
      downloaded: Boolean(lead.downloadStartedAt || lead.lastRequestedAt || lead.createdAt),
      journey: leadEvents.slice(-12),
    }
  }))

  return NextResponse.json({
    configured: true,
    summary: {
      pageViews,
      sessions,
      // Before individual download starts were recorded, a saved lead immediately
      // redirected to the PDF. Those legacy captures therefore represent starts too.
      downloads: playbookLeadCount,
      leads: contactLeads + playbookLeadCount,
      playbookLeads: playbookLeadCount,
      contactLeads,
      leadConversionRate: sessions ? Math.round((playbookLeadCount / sessions) * 1000) / 10 : 0,
    },
    topPages,
    topSections,
    scrollDepth,
    dailyTraffic,
    recentJourneys,
    recentContacts,
    recentPlaybookLeads,
  })
}
