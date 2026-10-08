import { z } from "zod"

export const analyticsEventSchema = z.object({
  type: z.enum(["page_view", "page_exit", "scroll_depth", "section_view", "download"]),
  sessionId: z.string().min(12).max(100),
  visitorId: z.string().min(12).max(100),
  path: z.string().regex(/^\//).max(300),
  occurredAt: z.string().datetime(),
  value: z.number().int().min(0).max(100).optional(),
  section: z.string().max(120).optional(),
  label: z.string().max(120).optional(),
  durationSeconds: z.number().int().min(0).max(86400).optional(),
})

export const analyticsBatchSchema = z.object({
  events: z.array(analyticsEventSchema).min(1).max(25),
})

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>
