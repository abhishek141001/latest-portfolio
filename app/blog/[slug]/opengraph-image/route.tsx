import { ImageResponse } from 'next/server'
import socialArticles from '@/data/blog-social.json'

export const runtime = 'edge'
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const post = socialArticles.find(post => post.slug === params.slug)
  if (!post) return new Response('Not found', { status: 404 })
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '64px', background: '#101827', color: '#f8fafc', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 26, color: '#93c5fd' }}>Abhishek Raj · AI Engineering</div><div style={{ display: 'flex', fontSize: 54, fontWeight: 700, lineHeight: 1.2 }}>{post.title}</div><div style={{ display: 'flex', fontSize: 24, color: '#cbd5e1' }}>Practical guides · Architecture · Reliability · Production systems</div></div>, { width: 1200, height: 630 })
}
