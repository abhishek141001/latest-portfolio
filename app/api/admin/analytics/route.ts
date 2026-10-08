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
  const [pageViews, sessions, downloads, leads, topPages, topSections, scrollDepth, dailyTraffic, recentJourneys, recentContacts] = await Promise.all([
    events.countDocuments({ type: "page_view", occurredAt: { $gte: since } }),
    events.distinct("sessionId", { occurredAt: { $gte: since } }).then((items) => items.length),
    events.countDocuments({ type: "download", label: "playbook_download", occurredAt: { $gte: since } }),
    contacts.countDocuments({ createdAt: { $gte: since } }),
    events.aggregate([{ $match: { type: "page_view", occurredAt: { $gte: since } } }, { $group: { _id: "$path", views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 8 }]).toArray(),
    events.aggregate([{ $match: { type: "section_view", occurredAt: { $gte: since } } }, { $group: { _id: "$section", views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 8 }]).toArray(),
    events.aggregate([{ $match: { type: "scroll_depth", occurredAt: { $gte: since } } }, { $group: { _id: "$value", hits: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray(),
    events.aggregate([{ $match: { type: "page_view", occurredAt: { $gte: since } } }, { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$occurredAt" } }, views: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray(),
    events.aggregate([{ $match: { occurredAt: { $gte: since } } }, { $sort: { occurredAt: -1 } }, { $group: { _id: "$sessionId", lastSeen: { $first: "$occurredAt" }, journey: { $push: { type: "$type", path: "$path", section: "$section", value: "$value", label: "$label" } } } }, { $sort: { lastSeen: -1 } }, { $limit: 10 }]).toArray(),
    contacts.find({}, { projection: { name: 1, email: 1, subject: 1, createdAt: 1, emailSent: 1 } }).sort({ createdAt: -1 }).limit(10).toArray(),
  ])

  return NextResponse.json({ configured: true, summary: { pageViews, sessions, downloads, leads }, topPages, topSections, scrollDepth, dailyTraffic, recentJourneys, recentContacts })
}
