import { timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"
import { adminCookie, createAdminSession } from "@/lib/admin-auth"

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function POST(request: Request) {
  const { email, password } = await request.json()
  if (typeof email !== "string" || typeof password !== "string" || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin authentication is not configured" }, { status: 503 })
  }

  if (!safeEqual(email.toLowerCase(), process.env.ADMIN_EMAIL.toLowerCase()) || !safeEqual(password, process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(adminCookie.name, createAdminSession(), adminCookie.options)
  return response
}
