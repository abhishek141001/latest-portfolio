import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-bold">Blog Post Not Found</h2>
      <p className="text-muted-foreground">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild variant="outline">
        <Link href="/blog">
          Return to Blog
        </Link>
      </Button>
    </div>
  )
} 