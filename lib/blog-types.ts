export interface Blog {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  modifiedDate?: string
  tags: string[]
  readTime: string
  format?: "Quick read" | "Deep dive"
  coverImage?: string
  sourceUrl?: string
  sourceLabel?: string
  cluster?: string
  aiAssisted?: boolean
  sources?: { title: string; url: string }[]
  relatedSlugs?: string[]
  figures?: { afterHeading: string; src: string; alt: string; caption: string }[]
  subheadings?: { id: string; title: string; level: number }[]
  author: { name: string; bio: string; avatar?: string }
}
