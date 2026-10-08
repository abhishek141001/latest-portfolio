import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "portfolio_admin_session"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET
}

function signature(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url")
}

export function createAdminSession() {
  const secret = getSecret()
  const email = process.env.ADMIN_EMAIL
  if (!secret || !email) throw new Error("Admin authentication is not configured")

  const payload = Buffer.from(JSON.stringify({ email, expiresAt: Date.now() + MAX_AGE_SECONDS * 1000 })).toString("base64url")
  return `${payload}.${signature(payload, secret)}`
}

export function isAdminSessionValid(value?: string) {
  const secret = getSecret()
  if (!value || !secret) return false

  const [payload, receivedSignature] = value.split(".")
  if (!payload || !receivedSignature) return false

  const expectedSignature = signature(payload, secret)
  if (receivedSignature.length !== expectedSignature.length) return false
  if (!timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature))) return false

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    return decoded.email === process.env.ADMIN_EMAIL && typeof decoded.expiresAt === "number" && decoded.expiresAt > Date.now()
  } catch {
    return false
  }
}

export function isAdminAuthenticated() {
  return isAdminSessionValid(cookies().get(COOKIE_NAME)?.value)
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  },
}
