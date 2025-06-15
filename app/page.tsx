import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { blogs } from "@/data/blogs"
import { projects } from "@/data/projects"
import { Metadata } from "next"
import profileImage from "../assets/abhishekraj.jpg"

export const metadata: Metadata = {
  title: "Abhishek Raj | Full Stack Developer",
  description: "Full stack developer passionate about building scalable products and solving business problems. Currently working at RegisterKaro, based in Gurgaon.",
  openGraph: {
    title: "Abhishek Raj | Full Stack Developer",
    description: "Full stack developer passionate about building scalable products and solving business problems. Currently working at RegisterKaro, based in Gurgaon.",
    url: "/",
    type: "website",
    images: [
      {
        url: profileImage.src,
        width: 800,
        height: 800,
        alt: "Abhishek Raj",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const latestPosts = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          {/* Text Side */}
          <div className="flex-[2] flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Hey, I am <span className="text-primary">Abhishek Raj</span></h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-600">curious, tinkerer, and explorer</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              I am a <span className="font-semibold">full stack developer</span> passionate about building products that solve <span className="font-semibold">scalable</span> and <span className="font-semibold">business problems</span>. With a strong foundation in both frontend and backend technologies, I strive to create efficient and user-friendly solutions that make a real impact.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Currently, I work at{' '}
              <a href="https://registerkaro.in/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">RegisterKaro</a>{' '}
              where I build compliance tech as a full stack developer. My role involves contributing to business logic and product growth, ensuring we deliver robust solutions that meet our clients' needs while maintaining high standards of code quality and performance.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Beyond my technical work, I am deeply interested in{' '}
              <a href="https://en.wikipedia.org/wiki/Entrepreneurship" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">entrepreneurship</a>{' '}
              and love exploring new ideas. I believe in continuous learning and staying updated with the latest technologies and industry trends. Currently based in <span className="font-semibold">Gurgaon</span>, I'm always open to connecting with fellow developers and entrepreneurs to share knowledge and experiences.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              <Button asChild variant="outline" className="text-sm sm:text-base">
                <Link href="https://x.com/ojhaabhishekraj/" target="_blank">X</Link>
              </Button>
              <Button asChild variant="outline" className="text-sm sm:text-base">
                <Link href="https://www.linkedin.com/in/abhishek-raj-69b55a230/" target="_blank">LinkedIn</Link>
              </Button>
              <Button asChild variant="outline" className="text-sm sm:text-base">
                <Link href="https://github.com/abhishek141001" target="_blank">GitHub</Link>
              </Button>
            </div>
          </div>
          {/* Image Side */}
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="rounded-2xl overflow-hidden border border-muted shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 bg-white">
              <Image
                src={profileImage}
                alt="Profile photo"
                width={300}
                height={300}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Recent Blog Posts Section */}
        <section className="w-full max-w-4xl mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Recent blog posts</h2>
            <Link href="/blog" className="text-primary underline text-sm font-medium">Full archive →</Link>
          </div>
          <ul className="divide-y divide-muted">
            {latestPosts.map((post) => (
              <li key={post.slug} className="flex flex-col sm:flex-row sm:items-center py-4">
                <time className="text-muted-foreground text-sm mb-2 sm:mb-0 sm:w-32" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </time>
                <Link href={`/blog/${post.slug}`} className="text-sm sm:text-base font-semibold hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        <section className="w-full max-w-4xl mt-16 sm:mt-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Projects</h2>
          <ul className="divide-y divide-muted">
            {projects.map((project) => {
              const link = project.liveUrl || project.githubUrl;
              return (
                <li key={project.title} className="py-4">
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-semibold text-primary hover:underline">
                      {project.title}
                    </a>
                  ) : (
                    <span className="text-sm sm:text-base font-semibold text-primary">{project.title}</span>
                  )}
                  <p className="text-muted-foreground text-sm sm:text-base mt-1">{project.description}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}