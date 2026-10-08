import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const input = contactSchema.parse(await request.json())
    if (input.website) return new NextResponse(null, { status: 204 })
    if (!isMongoConfigured()) return NextResponse.json({ error: "Contact storage is not configured yet." }, { status: 503 })

    const createdAt = new Date()
    const db = await getDb()
    const result = await db.collection("contact_submissions").insertOne({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      createdAt,
      emailSent: false,
    })

    let emailSent = false
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const email = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: input.email,
        subject: `Portfolio contact: ${input.subject}`,
        text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
      })
      emailSent = !email.error
      await db.collection("contact_submissions").updateOne({ _id: result.insertedId }, { $set: { emailSent } })
    }

    return NextResponse.json({ ok: true, emailSent })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please fill every field with valid details." }, { status: 400 })
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 })
  }
}
