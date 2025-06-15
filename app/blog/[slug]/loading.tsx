export default function Loading() {
  return (
    <div className="container py-32 px-2 md:px-4 lg:px-20 animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="w-full h-[400px] mb-12 rounded-lg bg-muted" />

      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-12 w-3/4 bg-muted rounded mb-4" />
        <div className="h-6 w-1/2 bg-muted rounded mb-6" />
        
        {/* Author Info Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-muted" />
          <div>
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-3 w-48 bg-muted rounded" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-4 bg-muted rounded-full" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
} 