import { MetadataRoute } from 'next'
import { blogs } from '@/data/blogs'
import { absoluteUrl } from '@/lib/site'
import { topicClusters } from '@/lib/blog-topics'

export default function sitemap(): MetadataRoute.Sitemap {
  // Define your static routes
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/blog/editorial-policy',
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
    lastModified: new Date(blog.modifiedDate || blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const topicRoutes = topicClusters.filter(topic => blogs.some(post => post.cluster === topic.slug)).map(topic => ({ url: absoluteUrl(`/blog/topics/${topic.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 }))
  return [...staticRoutes, ...topicRoutes, ...blogRoutes]
}
