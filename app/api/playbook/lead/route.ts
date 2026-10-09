import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

const leadSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.literal("homepage").optional(),
  sessionId: z.string().min(12).max(100),
  visitorId: z.string().min(12).max(100),
})

export async function POST(request: Request) {
  try {
    const input = leadSchema.parse(await request.json())

    if (!isMongoConfigured()) {
      return NextResponse.json({ error: "Email collection is not configured yet." }, { status: 503 })
    }

    const db = await getDb()
    const email = input.email.toLowerCase()

    const now = new Date()
    await db.collection("playbook_leads").updateOne(
      { email },
      {
        $set: {
          email,
          source: input.source || "homepage",
          lastRequestedAt: now,
          downloadStartedAt: now,
          lastSessionId: input.sessionId,
          lastVisitorId: input.visitorId,
        },
        $addToSet: { sessionIds: input.sessionId, visitorIds: input.visitorId },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }

    return NextResponse.json({ error: "Could not save your email. Please try again." }, { status: 500 })
  }
}
