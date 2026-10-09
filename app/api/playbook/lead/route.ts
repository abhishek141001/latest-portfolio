import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

const leadSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.literal("homepage").optional(),
})

export async function POST(request: Request) {
  try {
    const input = leadSchema.parse(await request.json())

    if (!isMongoConfigured()) {
      return NextResponse.json({ error: "Email collection is not configured yet." }, { status: 503 })
    }

    const db = await getDb()
    const email = input.email.toLowerCase()

    await db.collection("playbook_leads").updateOne(
      { email },
      {
        $set: { email, source: input.source || "homepage", lastRequestedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
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
