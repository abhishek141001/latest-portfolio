import { MetadataRoute } from 'next'
import { blogs } from '@/data/blogs'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Define your static routes
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/ai-native-engineering-playbook',
    '/contact',
  ].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add dynamic blog routes
  const blogRoutes = blogs.map((blog) => ({
    url: absoluteUrl(`/blog/${blog.slug}`),
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
