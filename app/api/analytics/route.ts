import { NextResponse } from "next/server"
import { analyticsBatchSchema } from "@/lib/analytics"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

export async function POST(request: Request) {
  if (!isMongoConfigured()) return new NextResponse(null, { status: 202 })

  try {
    const body = analyticsBatchSchema.parse(await request.json())
    const db = await getDb()
    await db.collection("analytics_events").insertMany(body.events.map((event) => ({ ...event, occurredAt: new Date(event.occurredAt) })))
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: "Could not record analytics" }, { status: 400 })
  }
}
