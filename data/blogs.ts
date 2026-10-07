// data/posts.js

// Define the Blog interface
interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: string;
  format?: "Quick read" | "Deep dive";
  coverImage?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  figures?: {
    afterHeading: string;
    src: string;
    alt: string;
    caption: string;
  }[];
  subheadings?: {
    id: string;
    title: string;
    level: number;
  }[];
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
}

// Blog data
export const blogs: Blog[] = [
    {
      slug: "building-modern-web-applications-with-nextjs",
      title: "Building Modern Web Applications with Next.js",
      excerpt: "A comprehensive guide to building scalable and performant web applications using Next.js 14.",
      content: `Hi, I'm Abhishek Raj, a software developer passionate about creating modern web applications. In this article, I'll share my experience and insights on building scalable applications with Next.js 14.

1. Server Components and Client Components:
Next.js 14 introduces a powerful paradigm with Server and Client Components. Understanding when to use each is crucial for optimal performance. Server Components reduce the JavaScript bundle size and improve initial page load, while Client Components enable interactive features.

2. App Router and File-based Routing:
The new App Router in Next.js provides a more intuitive way to organize your application. With file-based routing, you can create nested layouts, loading states, and error boundaries with ease. This structure makes it easier to maintain and scale your application.

3. Data Fetching and Caching:
Next.js offers multiple ways to fetch data, from Server Components to Route Handlers. The built-in caching mechanisms help optimize performance and reduce server load. Understanding these patterns is essential for building efficient applications.

4. Deployment and Optimization:
With features like Image Optimization, Font Optimization, and automatic code splitting, Next.js makes it easier to create performant applications. The framework also provides excellent deployment options through Vercel or other platforms.`,
      date: "2024-03-15",
      tags: ["Next.js", "Web Development", "React", "Performance"],
      readTime: "8 min read",
      coverImage: "data:image/png;base64,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",
      subheadings: [
        { id: "server-components", title: "Server Components and Client Components", level: 1 },
        { id: "app-router", title: "App Router and File-based Routing", level: 1 },
        { id: "data-fetching", title: "Data Fetching and Caching", level: 1 },
        { id: "deployment", title: "Deployment and Optimization", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
      }
    },
    {
      slug: "mastering-typescript-for-modern-web-development",
      title: "Mastering TypeScript for Modern Web Development",
      excerpt: "Learn how TypeScript can improve your development workflow and code quality in modern web applications.",
      content: `As Abhishek Raj, a software developer with extensive experience in modern web technologies, I want to share my insights on how TypeScript has transformed my development workflow. TypeScript has become an essential tool in modern web development, and I can attest to its benefits in creating more maintainable and robust applications.

1. Type Safety and Development Experience:
TypeScript's static typing helps catch errors during development rather than runtime. This leads to more reliable code and better developer experience through improved IDE support and autocompletion.

2. Advanced Type Features:
Understanding advanced TypeScript features like generics, utility types, and type inference can significantly improve your code quality. These features help create more flexible and reusable components.

3. Integration with Modern Frameworks:
TypeScript works seamlessly with modern frameworks like React, Next.js, and Vue. Learning how to properly type your components and hooks is crucial for building type-safe applications.

4. Best Practices and Patterns:
Adopting TypeScript best practices, such as proper interface design and type organization, can make your codebase more maintainable and easier to understand for other developers.`,
      date: "2024-03-10",
      tags: ["TypeScript", "Web Development", "Programming", "Best Practices"],
      readTime: "7 min read",
      coverImage: "data:image/png;base64,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",
      subheadings: [
        { id: "type-safety", title: "Type Safety and Development Experience", level: 1 },
        { id: "advanced-types", title: "Advanced Type Features", level: 1 },
        { id: "framework-integration", title: "Integration with Modern Frameworks", level: 1 },
        { id: "best-practices", title: "Best Practices and Patterns", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
      }
    },
    {
      slug: "building-accessible-web-applications",
      title: "Building Accessible Web Applications: A Developer's Guide",
      excerpt: "Essential practices and techniques for creating web applications that are accessible to all users.",
      content: `I'm Abhishek Raj, a software developer committed to creating inclusive digital experiences. Web accessibility is not just a legal requirement but a moral obligation for developers. In this guide, I'll share practical approaches to building accessible applications based on my experience.

1. Semantic HTML and ARIA:
Using semantic HTML elements and ARIA attributes correctly is fundamental to accessibility. These provide crucial information to assistive technologies and help create a better experience for all users.

2. Keyboard Navigation:
Ensuring your application is fully navigable via keyboard is essential. This includes proper focus management, keyboard shortcuts, and visible focus indicators.

3. Color and Contrast:
Understanding color theory and contrast ratios is crucial for creating accessible interfaces. Tools like the WCAG contrast checker can help ensure your designs meet accessibility standards.

4. Testing and Validation:
Regular testing with screen readers and other assistive technologies is essential. Automated tools can help, but manual testing provides the most accurate assessment of accessibility.`,
      date: "2024-03-05",
      tags: ["Accessibility", "Web Development", "UX", "Best Practices"],
      readTime: "6 min read",
      coverImage: "https://www.milesweb.com/blog/wp-content/uploads/2024/04/types-of-web-application.png",
      subheadings: [
        { id: "semantic-html", title: "Semantic HTML and ARIA", level: 1 },
        { id: "keyboard-nav", title: "Keyboard Navigation", level: 1 },
        { id: "color-contrast", title: "Color and Contrast", level: 1 },
        { id: "testing", title: "Testing and Validation", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://example.com/abhishek-avatar.jpg"
      }
    },
    {
      slug: "optimizing-web-performance-in-2024",
      title: "Optimizing Web Performance in 2024: A Practical Guide",
      excerpt: "Learn modern techniques and strategies for optimizing web application performance in today's digital landscape.",
      content: `As Abhishek Raj, a software developer focused on creating fast and efficient applications, I want to share practical strategies for optimizing web performance. In today's competitive digital landscape, performance optimization has become more critical than ever.

1. Core Web Vitals and User Experience:
Understanding and optimizing Core Web Vitals (LCP, FID, CLS) is crucial for providing a good user experience. These metrics directly impact user satisfaction and SEO rankings.

2. Modern Loading Strategies:
Implementing modern loading strategies like code splitting, lazy loading, and streaming can significantly improve initial load times. Understanding when to use each approach is key to optimization.

3. Caching and State Management:
Effective caching strategies and state management can reduce server load and improve response times. This includes browser caching, CDN usage, and efficient state management patterns.

4. Performance Monitoring:
Regular performance monitoring and optimization are essential. Tools like Lighthouse, WebPageTest, and real user monitoring can help identify and fix performance issues.`,
      date: "2025-05-10",
      tags: ["Performance", "Web Development", "Optimization", "Best Practices"],
      readTime: "7 min read",
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh-iyakBZsiLMOYq6QtFbNHdoFRL0vrip5gz_6EHaAH4x0OFmpUdXapfuUNUKhX6YfYQ&usqp=CAU",
      subheadings: [
        { id: "core-web-vitals", title: "Core Web Vitals and User Experience", level: 1 },
        { id: "loading-strategies", title: "Modern Loading Strategies", level: 1 },
        { id: "caching", title: "Caching and State Management", level: 1 },
        { id: "monitoring", title: "Performance Monitoring", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
      }
    },
    {
      slug: "real-feedback-ai-code-editors",
      title: "Real Feedback on AI Code Editors: Using Cursor, Copilot, Rooh Code and Codeium in Production",
      excerpt: "Tried and tested in real business projects — here's what it's like using Cursor, GitHub Copilot, Rooh Code, and Codeium as a software developer.",
      content: `If you're a developer wondering whether AI code editors like Cursor, GitHub Copilot, Rooh Code or Codeium can actually help you in real-world projects, this article is for you. I've used these tools while working on production-level business applications and I'm sharing my honest experience.
    
    This is not a general overview — it's feedback based on using these tools in live environments where stability and quality matter.
    
    1. Do AI Code Editors Really Save Time?
    
    Yes, in many situations they do. These tools are helpful when:
    - Writing repetitive or boilerplate code  
    - Creating initial components and setup files  
    - Generating basic unit tests  
    - Writing utility functions quickly  
    
    For small to medium-sized tasks, especially when speed is important, they can save a good amount of development time.
    
    2. But Things Get Complicated in Real Projects
    
    In business-critical systems or large codebases, using AI tools comes with challenges:
    - They don't always understand your unique business logic  
    - Generated code often needs review and manual changes  
    - Long-term maintainability can suffer if used carelessly  
    - They can speed up the start, but not the end-to-end workflow  
    
    While AI can help generate ideas or code quickly, you still need deep knowledge of your system to make it work reliably.
    
    3. What's the Trade-Off?
    
    There's a clear trade-off between productivity and quality:
    - Time saved writing code  
    - Time spent reviewing or correcting what AI suggested  
    - Possible drop in architecture or consistency if you're not careful  
    - More effort needed to keep code clean and future-proof  
    
    If you're not reviewing every line properly, these tools can introduce technical debt instead of saving time.
    
    4. Asking Other Developers: What's Been Your Experience?
    
    If you're also using AI tools in production, I'd love to hear from you. Some useful questions to reflect on:
    - Are they really making your work faster or better?  
    - Have you found unexpected benefits or problems?  
    - Are you using them in all projects or only for specific tasks?  
    - Have they changed how you think about writing software?  
    
    Your feedback can help others make better decisions about which tools to try and how to use them effectively.
    
    5. Final Thoughts on Using AI Editors
    
    These tools are improving rapidly, and they definitely have value. But they work best when paired with developer experience, not as a replacement for it.
    
    The goal is to use them in a smart way:
    Get help with routine tasks  
    - Maintain your own code quality standards  
    - Always review and understand the output  
    - Use them as assistants, not automatic solutions  
    
    AI code editors are powerful, but thoughtful usage is key. When used well, they can boost productivity without lowering quality.
    
    Have you tried any of these tools in real-world development? Let me know how they performed in your projects. It's time we move beyond demos and share practical insights.`,
      date: "2025-06-15",
      tags: [
        "AI Code Editors",
        "Cursor",
        "GitHub Copilot",
        "Rooh Code",
        "Codeium",
        "Developer Tools",
        "Software Development",
        "Productivity Tools",
        "Real-World Feedback"
      ],
      readTime: "6 min read",
      coverImage: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?ga=GA1.1.763863581.1750012251&semt=ais_hybrid&w=740",
      subheadings: [
        { id: "time-savings", title: "Do AI Code Editors Really Save Time?", level: 1 },
        { id: "real-projects", title: "But Things Get Complicated in Real Projects", level: 1 },
        { id: "trade-off", title: "What's the Trade-Off?", level: 1 },
        { id: "community-feedback", title: "Asking Other Developers: What's Been Your Experience?", level: 1 },
        { id: "final-thoughts", title: "Final Thoughts on Using AI Editors", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
      }
    },
    {
      slug: "real-struggles-building-product-from-scratch",
      title: "The Real Struggles of Building a Product from Scratch",
      excerpt: "From the outside, building a product looks simple. But in reality, it's messy. This is the story of what it's really like to build from scratch.",
      content: `From the outside, building a product looks simple.
You imagine a straight path:
Idea → Plan → Build → Launch.

But in reality, it's messy:
Confusion → Testing → Failing → Learning → Adjusting → Progress.

This is the story of what it's really like.

## The Exciting but Unclear Beginning

When we started, we had one big goal:

"Move people from the old way of working to a new, automated system."

It sounded straightforward.
But there was a hidden challenge — no one could clearly describe the exact problem we were solving.

People close to the work described the symptoms — things like delays, manual errors, and lack of tracking — but not the root cause.
It was like being told "the house is leaking" without knowing which pipe is broken.

## No Map, Only a Compass

We didn't have documentation.
We didn't have process flows.
We didn't even have structured data to work with.

Everything existed in people's heads, and if you asked five different people, you'd get five different answers.

The founder's vision gave us direction — like a compass pointing north — but there was no map to navigate the journey.

## Failing Fast… and Often

We were excited to build.
We didn't wait for a perfect plan.
We made quick assumptions, designed a basic structure, and implemented our first version in record time.

It didn't work.
We tried again with a slightly different approach.
It failed again.
And again.

From the outside, it might have looked like we were just "getting it wrong."
But inside, we were learning fast.

Every failed attempt revealed new truths:

- The steps we thought were critical weren't as important.
- Some bottlenecks existed in places we never considered.
- Certain manual tasks couldn't be automated without first changing how people worked.

## Spotting Patterns Through Data and Operations

The real breakthrough came when we moved closer to the operations team.
We stopped guessing.
We started observing.

We watched how the work actually flowed — not how it was described in meetings.
We reviewed every interaction.
We dug into whatever data we could get our hands on.

Slowly, patterns started to appear.

- The same mistakes happened again and again at certain steps.
- Certain tasks always caused delays no matter who handled them.
- Some data fields were entered inconsistently, breaking automation later in the process.

These patterns became the foundation for the right solution.

## Shaping the Real Product

Once we understood these patterns, everything changed.
We redesigned the product flow to match the reality of operations, not our early assumptions.
We built automation that handled repetitive, high-error tasks first.
We created a basic knowledge base to keep everyone aligned.

The more we learned, the more the product aligned with real business needs.

## Lessons from the Journey

Looking back, here's what building from scratch taught me:

**Clarity isn't instant — you have to earn it.**
Understanding comes from deep observation, not from the first meeting.

**A vision is a compass, not a map.**
The founder or leader can tell you where they want to go, but you still have to figure out how to get there.

**Fail fast, fail often, but learn every time.**
Early failures are not waste; they are speed bumps that show you the right road.

**Patterns are the key to progress.**
If a problem keeps repeating, it's pointing at something worth fixing.

**The real work is before the code.**
Writing code is easy once you truly understand the problem.

## Final Thought

Building from scratch isn't just about launching fast — it's about learning fast.
The more time you spend understanding the problem, the less time you waste building the wrong solution.

And if you fail? Fail fast, fail forward, and let each failure guide your next move.`,
      date: "2025-08-09",
      tags: [
        "Product Development",
        "Startup",
        "Building from Scratch",
        "Product Management",
        "Learning from Failure",
        "Business Strategy",
        "Innovation"
      ],
      readTime: "8 min read",
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      subheadings: [
        { id: "exciting-beginning", title: "The Exciting but Unclear Beginning", level: 1 },
        { id: "no-map-compass", title: "No Map, Only a Compass", level: 1 },
        { id: "failing-fast", title: "Failing Fast… and Often", level: 1 },
        { id: "spotting-patterns", title: "Spotting Patterns Through Data and Operations", level: 1 },
        { id: "shaping-product", title: "Shaping the Real Product", level: 1 },
        { id: "lessons-journey", title: "Lessons from the Journey", level: 1 },
        { id: "final-thought", title: "Final Thought", level: 1 }
      ],
      author: {
        name: "Abhishek Raj",
        bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
      }
    },
    {
      slug: "ai-native-engineering-from-ai-assistance-to-ai-collaboration",
      title: "AI-Native Engineering: Moving From AI Assistance to AI Collaboration",
      excerpt: "AI-native engineering is not about handing a codebase to an agent. It is about redesigning the engineering loop so people and AI can plan, build, verify, and learn together.",
      content: `Most teams using AI are measuring the wrong thing: lines of code generated. The metric that matters is time from a customer problem to a verified outcome. AI-native engineering is the practice of redesigning that entire path—not handing a ticket to a chatbot and hoping for the best.

That distinction became real for me while building browser automation, compliance workflows, and internal operational systems. In those systems, a convincing answer is useless if it routes work to the wrong place, misses a rule, or leaves an operator to clean up a silent failure. I care less about how much an agent can write and more about whether the next person can trust what it did.

## The Shift: From Typing Faster to Learning Faster
Autocomplete made individual developers faster. Coding agents change the unit of work: an engineer can now delegate codebase exploration, first-pass implementation, test creation, and documentation. But the bottleneck moves upstream. If the requirement is fuzzy, the context is stale, or the checks are weak, an agent just reaches the wrong destination sooner.

The useful question is not "Can AI build this?" It is "What evidence would convince us this is safe to ship, and how quickly can we collect it?" That reframes AI as part of a delivery system.

## The Loop I Would Actually Use
For a medium-sized product change, use six explicit steps:

- Write the outcome in one sentence and list three acceptance checks.
- Give the agent only the relevant files, architecture notes, and constraints.
- Ask for a plan before asking for an edit.
- Make one bounded change, not a heroic repository-wide rewrite.
- Run the smallest useful set of automated and manual checks.
- Review the diff and the evidence separately.

The detail people miss is the fourth step. Small diffs are not old-fashioned caution; they are how you keep AI work legible, reversible, and fast to verify.

## Where AI Earns Its Keep
AI is unusually good at turning scattered information into a starting point: mapping an unfamiliar module, locating duplicate logic, drafting tests around known behavior, or translating a migration plan into repetitive edits. It is less trustworthy when product intent is missing, authorization is involved, or the correct answer depends on a customer promise that only exists in someone's head.

That makes senior engineering judgment more valuable, not less. The high-leverage work is framing the problem, choosing boundaries, identifying failure modes, and rejecting a plausible but wrong answer.

## The Guardrail Test
Before letting an agent touch a workflow, ask four questions. Can it see the relevant conventions? Can it prove its change works? Can a person understand the diff in minutes? Can the change be rolled back? If any answer is no, fix the engineering environment before adding more autonomy.

Useful guardrails are boring: repository instructions, tests that actually fail for the right reason, scoped credentials, CI, preview environments, and a definition of done. Boring infrastructure is what turns AI speed into compounding speed.

## A 30-Day Starting Point
Pick one repeated, low-risk task: adding a validated form field, writing regression tests, or documenting an endpoint. Run it through the same agent workflow for a month. Track elapsed time to reviewed merge, rework, escaped defects, and how often the developer had to correct missing context. Then improve the weakest stage.

The teams that win with AI will not generate the most code. They will build the fastest loop for turning uncertain work into trusted decisions.`,
      date: "2025-09-17",
      tags: ["AI-Native Engineering", "AI-Assisted Development", "AI Coding", "Software Engineering", "Developer Productivity", "Engineering Workflow"],
      readTime: "6 min read",
      coverImage: "/images/blog/ai-native-engineering.png",
      figures: [{ afterHeading: "the-loop-i-would-actually-use", src: "/images/blog/agent-workflow-diagram.png", alt: "A visual workflow from goal and context to implementation, testing, and human review", caption: "A trustworthy AI workflow produces visible evidence at every stage—not just generated code." }],
      format: "Deep dive",
      subheadings: [
        { id: "what-is-ai-native-engineering", title: "What Is AI-Native Engineering?", level: 1 },
        { id: "the-engineering-loop-changes", title: "The Engineering Loop Changes", level: 1 },
        { id: "build-the-guardrails-before-the-speed", title: "Build the Guardrails Before the Speed", level: 1 },
        { id: "skills-that-matter-more-not-less", title: "Skills That Matter More, Not Less", level: 1 },
        { id: "start-with-one-repeatable-workflow", title: "Start With One Repeatable Workflow", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "agentic-coding-workflows-that-ship-reliable-software",
      title: "Agentic Coding Workflows: How to Ship Reliable Software With AI Agents",
      excerpt: "A practical guide to using coding agents for planning, implementation, testing, and review without confusing generated output for finished software.",
      content: `A coding agent that produces a thousand-line pull request in ten minutes has not saved you time if it takes two days to understand whether it is safe. Agentic coding works when the agent is treated like a fast junior collaborator with excellent recall and zero product intuition.

My production work includes systems where a small change can touch customer flows, operational queues, and compliance logic at the same time. That has made me allergic to impressive-looking diffs that nobody can explain. The fastest AI-assisted change is usually the one that stays narrow enough for me to review without reconstructing the entire system in my head.

## The Brief That Prevents Expensive Rework
Give an agent a job it can finish and a reviewer can verify. A strong brief names the user-facing outcome, files or systems in scope, invariants that must not change, acceptance checks, and the command that proves success.

Compare "fix checkout validation" with "reject an expired coupon before payment submission, preserve the API response shape, and add tests for expired, valid, and missing coupons." The second prompt is not more verbose for the sake of it. It removes three opportunities for the agent to invent product behavior.

## Make Planning a Separate Deliverable
For anything beyond a small edit, request a plan first. A useful plan identifies the existing pattern, the impacted files, the intended data flow, risks, and test strategy. Review this before the agent edits. Five minutes of correction at planning time can prevent an hour of code review.

If the plan cannot name the relevant code paths, that is a signal to improve context—not a reason to let the agent search and rewrite more broadly.

## The Two-Loop Method
Use one loop for creation and another for proof. In the creation loop, the agent inspects, plans, and edits. In the proof loop, it runs type checks, tests, builds, and targeted browser or API checks; then it reports failures and evidence. Keep the loops distinct so a confident summary cannot disguise an untested change.

For production work, I want the handoff to include: changed files, assumptions, commands run, results, and known gaps. This makes review asynchronous and makes failures teach the next run.

## Review What Changed, Not How It Sounds
AI explanations are cheap. Diffs are evidence. Review authorization paths, error handling, schema changes, dependencies, migrations, analytics, and tests that could pass without testing the intended behavior. Ask one ruthless question: is this the smallest change that satisfies the requirement?

This is not mistrust of the tool. It is good engineering. The same standard applies to code written by a colleague at 2 a.m. or generated by an agent at 2 seconds.

## A Safe Default Workflow
Use agents freely for exploration, test drafts, refactors with strong test coverage, and mechanical migrations. Add human approval for secrets, permissions, payments, destructive operations, and public communication. Stop automatic retries when the evidence is ambiguous; escalation is a feature, not a failure.

The goal is not autonomous shipping. The goal is a development loop where a developer spends more time making decisions and less time performing the mechanical work around them.`,
      date: "2025-11-12",
      tags: ["Agentic Coding", "Coding Agents", "AI Software Development", "AI Code Review", "AI Testing", "Developer Tools"],
      readTime: "7 min read",
      coverImage: "/images/blog/ai-native-engineering.png",
      figures: [{ afterHeading: "the-two-loop-method", src: "/images/blog/agent-workflow-diagram.png", alt: "A build-and-verify workflow for agentic coding", caption: "Separate creation from proof so a confident summary can never substitute for verification." }],
      format: "Deep dive",
      subheadings: [
        { id: "a-coding-agent-needs-a-clear-job", title: "A Coding Agent Needs a Clear Job", level: 1 },
        { id: "plan-before-the-agent-edits", title: "Plan Before the Agent Edits", level: 1 },
        { id: "verification-is-the-product", title: "Verification Is the Product", level: 1 },
        { id: "review-the-diff-not-the-story", title: "Review the Diff, Not the Story", level: 1 },
        { id: "a-simple-production-pattern", title: "A Simple Production Pattern", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "context-engineering-for-ai-agents-practical-guide",
      title: "Context Engineering for AI Agents: A Practical Guide for Better Results",
      excerpt: "Context engineering is the discipline of giving an AI agent the right information, tools, and constraints at the right moment—not simply filling its context window.",
      content: `The most expensive sentence in AI engineering is: "The model is smart, but it doesn't understand our business." Usually the model is not the problem. We gave it a 200-page handbook, three stale chat summaries, and a tool called execute_action. Context engineering is how you stop doing that.

I have seen this outside of AI too. In compliance and operations work, the written rule is rarely the whole story: timing, service type, customer state, and exceptions change what happens next. An agent needs the same operational context a good teammate would ask for before acting. Giving it a PDF and hoping is not a system design.

## Context Is a Working Set, Not a Document Dump
Prompt engineering is about the instruction. Context engineering is about everything available when an agent decides: task state, policies, retrieved facts, tool results, project conventions, user preferences, and memory. The design problem is ruthless selection: what must be present for the next decision, and what will distract it?

More tokens do not equal more intelligence. Extra context can be stale, contradictory, expensive, or simply irrelevant. The useful target is the smallest trustworthy working set.

## Build a Context Packet
For a meaningful agent action, create a packet with six parts:

- Objective: the user outcome and the exact decision being made.
- Constraints: policies, boundaries, and non-negotiable rules.
- Evidence: authoritative facts with source and freshness.
- State: what has happened, what is pending, and what changed.
- Tools: only the capabilities needed now, with clear descriptions.
- Exit criteria: what success, escalation, and stop look like.

This is a practical debugging tool. When an agent fails, inspect the packet before swapping the model. You can often see the missing fact or conflicting instruction immediately.

## Separate Instructions, Facts, and Memory
Instructions tell an agent how to behave. Facts describe the world right now. Memory preserves a compact record of useful past decisions. Mixing these together is how an old summary turns into a phantom policy.

Store source-of-truth facts outside the conversation and retrieve them when needed. Use structured handoffs for long work: completed steps, validated evidence, unresolved questions, and recommended next action. A short, inspectable summary beats replaying a 100-message transcript.

## RAG Is a Retrieval Problem Before It Is a Model Problem
Retrieval-augmented generation can be excellent, but only when the system finds the right source at the right time. Test retrieval separately: did it return the current policy, the relevant paragraph, and enough provenance for a human to verify it? If not, better wording from the model only makes the wrong answer sound more credible.

Start with a small, curated knowledge base. Improve source quality, metadata, ownership, freshness, and access control before adding complex chunking or a larger vector database.

## The Shareable Rule
Give the agent the context you would give a competent new teammate for the next 15 minutes of work—not your entire company history. Clear objective, current facts, allowed tools, and a way to prove the answer. That is context engineering in practice.`,
      date: "2026-01-15",
      tags: ["Context Engineering", "AI Agents", "Prompt Engineering", "RAG", "LLM Context Window", "Agent Memory", "AI Engineering"],
      readTime: "9 min read",
      coverImage: "/images/blog/context-engineering.png",
      figures: [{ afterHeading: "build-a-context-packet", src: "/images/blog/context-packet-diagram.png", alt: "Selected context flowing into a compact AI decision workspace", caption: "The agent needs a curated working set: objective, constraints, evidence, state, tools, and exit criteria." }],
      format: "Deep dive",
      subheadings: [
        { id: "prompt-engineering-is-only-the-beginning", title: "Prompt Engineering Is Only the Beginning", level: 1 },
        { id: "design-a-context-budget", title: "Design a Context Budget", level: 1 },
        { id: "separate-facts-instructions-and-memory", title: "Separate Facts, Instructions, and Memory", level: 1 },
        { id: "retrieval-needs-evaluation-too", title: "Retrieval Needs Evaluation Too", level: 1 },
        { id: "the-outcome-is-reliable-decisions", title: "The Outcome Is Reliable Decisions", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "when-to-use-subagents-ai-engineering",
      title: "When to Use Subagents in AI Engineering—and When Not To",
      excerpt: "Subagents can split research, implementation, testing, and review into focused work. The advantage comes from clear boundaries, not from adding more agents.",
      content: `If one agent is confused, five agents are not a strategy. They are a group chat with a token budget. Subagents are powerful only when they take genuinely separate work off the critical path or provide an independent check that a single agent cannot.

I learned the human version of this while working across product, operations, and engineering. Splitting a task between people only helps when each person can return a clear artifact—an answer, a risk, or a decision—not another meeting. I apply the same test to subagents.

## The Litmus Test
Before creating a subagent, finish this sentence: "I need a separate agent because it owns ________, and its output can be checked by ________." If you cannot fill both blanks, keep the work with one agent.

Good uses include parallel codebase discovery, independent security review, research across separate sources, and a test-focused pass after implementation. Bad uses include splitting one linear task into artificial roles or asking several agents the same vague question.

## Give Every Worker a Contract
A subagent needs a narrow objective, allowed tools, relevant context, output schema, and a stop condition. "Map authentication: return entry points, data flow, risks, and file paths" is a contract. "Figure out auth" creates an expensive essay.

Require evidence in the output: files inspected, source links, assumptions, confidence, and unanswered questions. That lets a parent agent or engineer compare work without trusting polished prose.

## Fan Out, Then Make One Decision
The useful pattern is fan out, synthesize, verify. Independent workers gather targeted evidence. One owner reconciles conflicts into a plan. A final check validates the plan against requirements. This keeps parallelism where it helps and keeps accountability in one place.

Do not make the synthesizer blindly merge every recommendation. Conflicting answers should trigger a named escalation rule, not another round of agents debating each other.

## What It Costs
Subagents consume more than tokens. They introduce coordination, state-sharing, retries, and failure modes. Measure whether they improve completion quality, elapsed time, human intervention, or cost per successful task. If they do not, delete them.

The best multi-agent system is usually smaller than the architecture diagram. Start with one agent. Add a subagent only when it owns a clear, independently verifiable responsibility.`,
      date: "2026-03-05",
      tags: ["Subagents", "Multi-Agent Systems", "AI Agent Orchestration", "Agentic Workflows", "AI Engineering", "Developer Productivity"],
      readTime: "4 min read",
      coverImage: "/images/blog/graph-engineering.png",
      figures: [{ afterHeading: "fan-out-then-make-one-decision", src: "/images/blog/agent-orchestration-diagram.png", alt: "Specialist agents converge at a validation checkpoint before human approval", caption: "Parallel discovery is useful; accountability should still converge in one visible decision." }],
      format: "Quick read",
      subheadings: [
        { id: "why-subagents-can-be-useful", title: "Why Subagents Can Be Useful", level: 1 },
        { id: "give-every-subagent-a-contract", title: "Give Every Subagent a Contract", level: 1 },
        { id: "use-parallelism-only-for-independent-work", title: "Use Parallelism Only for Independent Work", level: 1 },
        { id: "avoid-the-multi-agent-theatre", title: "Avoid the Multi-Agent Theatre", level: 1 },
        { id: "measure-the-advantage", title: "Measure the Advantage", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "mcp-tools-ai-agents-safe-integration",
      title: "MCP and AI Agent Tools: Building Safe, Useful Integrations",
      excerpt: "Tools turn an LLM from a conversational interface into a system that can inspect and act. The Model Context Protocol makes the integration layer clearer—but permissions still matter.",
      content: `AI agents become genuinely useful when they can read live data and take carefully bounded actions. That may mean searching documentation, querying an issue tracker, reading a database through a safe interface, or opening a pull request. Tool integration is where an AI prototype meets the real world.

Building browser automations taught me that an action is never just an action. A login state expires, a page changes, a third-party response is delayed, and somebody needs to know exactly what happened. That is why I prefer agent tools that expose a small, inspectable operation over a powerful tool that can do everything badly.

## What MCP Changes
The Model Context Protocol, commonly called MCP, gives tools and context providers a shared way to describe capabilities to AI applications. Instead of creating a custom integration for every model and client, teams can expose a consistent interface for resources, prompts, and tools.

That interoperability is valuable, but it does not remove engineering responsibilities. A tool description is part of the agent's context; a poorly designed tool can still be confusing, overly broad, or unsafe.

## Design Tools for Small, Verifiable Actions
The best agent tools do one clear thing and return structured results. Prefer get_customer_order(orderId) over a generic database shell. Prefer create_draft_refund over send_refund. Small tools are easier for the model to choose correctly and easier for a human to audit.

Make side effects explicit. Separate read operations from write operations, include dry-run support where possible, and return a clear record of what happened. Tool inputs should be validated by code, not trusted because an LLM supplied them.

## Least Privilege Is the Default
An agent should receive only the permissions needed for its current task. Use scoped credentials, allowlists, role-based access, sandboxed execution, and approval gates for consequential actions. Never put a secret in model-visible context when a scoped server-side tool can do the job.

Treat external content as untrusted too. A web page, support ticket, or document may contain instructions intended to redirect an agent. Keep tool policy separate from retrieved content and validate decisions before execution.

## Observability Makes Tools Operable
Log tool calls, inputs, results, authorization decisions, latency, cost, and failures with appropriate redaction. This gives engineers a way to answer basic production questions: what did the agent see, which action did it take, and why did it fail?

Start with read-only tools and a limited user group. Add write access only after you have a clear audit trail and a recovery plan.

## An Integration Is a Product Surface
MCP and agent tools are not plumbing to hide after a demo. They are part of your product's security and user experience. Good tool design gives AI agents useful capability while preserving the controls that make software trustworthy.

## A Tool Design Test
For every tool, write one sentence describing its allowed action, validate every input in code, and make the side effect visible in its result. If you cannot explain a tool's permission boundary in one breath, it is too broad for an agent.`,
      date: "2026-05-21",
      tags: ["Model Context Protocol", "MCP", "AI Agent Tools", "AI Integrations", "AI Agent Security", "Tool Calling", "LLM Applications"],
      readTime: "7 min read",
      coverImage: "/images/blog/ai-native-engineering.png",
      figures: [{ afterHeading: "observability-makes-tools-operable", src: "/images/blog/agent-workflow-diagram.png", alt: "An AI workflow with verification checkpoints and a human review step", caption: "Tool calls should leave an auditable trail from intent to result." }],
      format: "Deep dive",
      subheadings: [
        { id: "what-mcp-changes", title: "What MCP Changes", level: 1 },
        { id: "design-tools-for-small-verifiable-actions", title: "Design Tools for Small, Verifiable Actions", level: 1 },
        { id: "least-privilege-is-the-default", title: "Least Privilege Is the Default", level: 1 },
        { id: "observability-makes-tools-operable", title: "Observability Makes Tools Operable", level: 1 },
        { id: "an-integration-is-a-product-surface", title: "An Integration Is a Product Surface", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "graph-engineering-ai-agent-workflows",
      title: "Graph Engineering for AI Agents: Design Workflows, Not Just Prompts",
      excerpt: "Graph engineering makes an agent workflow explicit: its steps, state, branches, parallel work, approval gates, retries, and stopping conditions.",
      content: `As AI tasks become multi-step, one open-ended agent loop becomes difficult to understand and even harder to debug. Graph engineering is a useful way to make the process visible. A workflow is represented as nodes that do work and edges that decide what happens next.

I naturally think in graphs because production operations already are graphs: intake, validation, handoff, exception, retry, approval. The moment a workflow involves real customers or a queue of work, "let the agent keep trying" stops being a design. I want to know where work is, why it moved, and who owns the next decision.

## Why AI Agent Workflows Become Graphs
Even a simple agent has a graph hiding inside it: receive a task, gather context, choose a tool, inspect the result, and either continue, ask for help, or finish. Naming those steps matters because it lets a team control where decisions happen and retain state safely.

An explicit graph is particularly helpful for long-running, high-value workflows where failures, approvals, and handoffs must be recoverable.

## Start With the Smallest Useful Graph
Do not begin by turning every workflow into a complex multi-agent diagram. Start with the known path: intake, retrieve evidence, produce a draft, validate it, and request approval if needed. Use deterministic code for deterministic steps and reserve model judgment for ambiguity.

Every node should have an input contract, output contract, timeout, and error policy. Every edge should answer a simple question: what evidence permits this transition?

## State Is the Backbone
Agent state should be explicit, compact, and durable. Store the task ID, current step, relevant artifacts, validation results, user approvals, and a concise work summary. Avoid relying on a giant conversation transcript as the only source of truth.

Checkpoint state before an expensive call or irreversible action. Then a failed service, timeout, or human pause does not force the entire workflow to restart.

## Fan Out, Fan In, and Human Gates
Graphs make parallel work easier to reason about. Independent research or review tasks can fan out, then fan in to a synthesis step. But aggregation needs rules: define how conflicts are resolved, what counts as enough evidence, and when the workflow escalates to a person.

Human approval is a first-class node, not an exception handler. It is appropriate for uncertain outputs and actions with financial, legal, security, or customer impact.

## Optimize for Recovery, Not Autonomy
The goal of graph engineering is not to make an AI system look autonomous. It is to create workflows that can be inspected, tested, paused, retried, and improved. When the path is clear, a graph is often simpler and safer than asking one agent to improvise indefinitely.

## A Five-Question Graph Review
Before adding a node, ask: what state enters, what state leaves, what can fail, who can approve it, and how does the workflow recover? If a node cannot answer those questions, it is not ready for production.`,
      date: "2026-07-09",
      tags: ["Graph Engineering", "AI Agents", "Agent Workflows", "Agent Orchestration", "Multi-Agent Systems", "LangGraph", "AI Automation"],
      readTime: "8 min read",
      coverImage: "/images/blog/graph-engineering.png",
      figures: [{ afterHeading: "fan-out-fan-in-and-human-gates", src: "/images/blog/agent-orchestration-diagram.png", alt: "Several agent paths converge at a validation checkpoint and human approval gate", caption: "A good graph makes parallel work, safe stops, and human gates visible." }],
      format: "Deep dive",
      subheadings: [
        { id: "why-ai-agent-workflows-become-graphs", title: "Why AI Agent Workflows Become Graphs", level: 1 },
        { id: "start-with-the-smallest-useful-graph", title: "Start With the Smallest Useful Graph", level: 1 },
        { id: "state-is-the-backbone", title: "State Is the Backbone", level: 1 },
        { id: "fan-out-fan-in-and-human-gates", title: "Fan Out, Fan In, and Human Gates", level: 1 },
        { id: "optimize-for-recovery-not-autonomy", title: "Optimize for Recovery, Not Autonomy", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "evaluating-ai-agents-production",
      title: "How to Evaluate AI Agents in Production: Metrics That Actually Matter",
      excerpt: "A production AI agent needs more than a clever demo. Evaluate task success, safety, latency, cost, recovery, and the quality of human handoffs.",
      content: `An AI agent is easy to admire when it solves a hand-picked example. Production is different: inputs are incomplete, tools fail, policies change, and users ask for things you did not anticipate. Evaluation is the discipline that closes the gap between an impressive demo and a reliable product.

In operational software, I have found that the painful failure is rarely a visible crash. It is work that appears complete but is routed incorrectly, a field that looks valid but breaks a later process, or an edge case that only surfaces after a customer follows up. That is the bar I bring to agent evaluation: can we detect a bad result before it becomes somebody else's problem?

## Start With a Task-Level Definition of Success
Define success from the user's perspective. For a support agent, it may be a correct, policy-compliant resolution. For a coding agent, it may be a reviewed change that passes tests and does not create regressions. A fluent response is not enough.

Build a small evaluation set from real, anonymized tasks. Include routine cases, edge cases, ambiguous requests, malicious instructions, missing data, and tool failures. Keep the set versioned as the product evolves.

## Measure More Than Accuracy
Track task success rate, groundedness or citation quality, tool-call correctness, human escalation rate, retry rate, latency, token cost, and recovery after a failure. The right metric depends on the workflow, but every metric should connect to a product or operational outcome.

Segment results by task type, model version, prompt or policy version, and tool version. An aggregate score can hide a dangerous regression in one important path.

## Use Both Offline and Online Evaluation
Offline evaluation gives you a safe repeatable benchmark before release. Online evaluation shows what happens with real traffic, changing data, and actual user behavior. Use staged rollouts, sampled transcript review, user feedback, and monitoring to connect the two.

When possible, compare the agent with the existing workflow, not an imaginary perfect answer. The question is whether it improves the experience safely and sustainably.

## Evaluate the Whole System
Most failures are not model failures alone. Retrieval may return outdated policy. A tool may be ambiguous. A workflow may skip an approval. Evaluation should trace the complete chain: context, model decision, tool selection, tool response, final output, and human action.

This is also how teams find the highest-leverage fix. Often a clearer tool schema or better source document improves reliability more than changing models.

## Make Evaluation Continuous
AI behavior changes when models, prompts, tools, data, and users change. Run regression evaluations in CI where possible, monitor production continuously, and turn important failures into new test cases. Evaluation is not a launch checklist. It is an ongoing part of AI-native engineering.

## The Friday-Morning Test
Could you explain a bad decision to a customer using the input, source, tool call, version, and recovery action? If not, you have a demo with production traffic, not an operable agent.`,
      date: "2026-08-26",
      tags: ["AI Agent Evaluation", "LLM Evaluation", "AI Observability", "AI Agents in Production", "Agent Reliability", "AI Testing"],
      readTime: "7 min read",
      coverImage: "/images/blog/graph-engineering.png",
      figures: [{ afterHeading: "evaluate-the-whole-system", src: "/images/blog/agent-orchestration-diagram.png", alt: "An agent workflow with validation, approval, and a safely stopped failure path", caption: "Evaluate the complete system: context, decision, tool use, outcome, and recovery." }],
      format: "Deep dive",
      subheadings: [
        { id: "start-with-a-task-level-definition-of-success", title: "Start With a Task-Level Definition of Success", level: 1 },
        { id: "measure-more-than-accuracy", title: "Measure More Than Accuracy", level: 1 },
        { id: "use-both-offline-and-online-evaluation", title: "Use Both Offline and Online Evaluation", level: 1 },
        { id: "evaluate-the-whole-system", title: "Evaluate the Whole System", level: 1 },
        { id: "make-evaluation-continuous", title: "Make Evaluation Continuous", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "typed-decisions-vs-llms-jev-typesafe-ai",
      title: "Typed Decisions vs LLMs: When You Don't Need a Billion-Parameter Model",
      excerpt: "Not every AI workflow needs an LLM. For constrained decisions, typed outputs and parallel execution can be faster, cheaper, and easier to trust.",
      content: `We're using billion-parameter LLMs to make decisions with just three possible answers. Why? That question is the starting point for a better way to design some AI systems: use the smallest, most deterministic approach that can solve the actual problem.

This is not anti-LLM. I use them when the problem is ambiguous and language-heavy. But while building rule-driven workflows, I have repeatedly found that the expensive part is not generating an answer—it is proving that the answer can safely drive the next step. If the choices are known, I want a system that makes invalid choices hard or impossible.

This article expands on my original post about Jev by TypeSafe AI, which focuses on parallel decisions, typed outputs, and low-cost execution. The broader engineering idea matters even if the tools change.

## Not Every Decision Needs an LLM
Large language models are powerful when a task needs language understanding, synthesis, ambiguity handling, or open-ended generation. But many product decisions are constrained: approve or reject, choose one of three routes, validate a schema, apply a policy, or classify a known input.

Using a general-purpose LLM for every one of those steps can add latency, cost, and nondeterminism without improving the outcome. Before adding a model call, ask: is this genuinely a language problem, or is it a rules, data, or classification problem with a small answer space?

## Typed Outputs Are an Engineering Advantage
Typed outputs force a system to return data in a known shape. Instead of asking an AI to respond with free-form text and hoping it follows a format, define the allowed fields and values. That makes the result easier to validate, test, store, and pass into the next step of a workflow.

For example, a routing decision might return only a destination, confidence level, and reason code. Application code can reject invalid values before an action is taken. This turns AI output from a paragraph that needs interpretation into an interface that software can safely use.

## Parallel Decisions Improve the Critical Path
Some decisions do not depend on one another. A system can check eligibility, detect risk, and validate a payload at the same time, then combine the results. Parallelism reduces end-to-end waiting time when tasks are independent.

The important caveat is independence. Parallel work is not free: it adds coordination, failure handling, and observability requirements. Use it where it shortens the path to a verified result, not simply because an AI workflow can call several workers.

## Choose the Smallest Reliable System
The best AI architecture is not the one with the largest model. It is the one that produces a correct, explainable result at an acceptable cost and latency. A practical decision ladder is: use normal application logic for deterministic rules, use constrained models or classifiers for narrow judgments, and use an LLM where language reasoning creates real value.

This approach also makes systems easier to debug. When a typed, bounded decision fails, an engineer can see the inputs, rule or model version, and validation result. That is much harder when every operation is hidden inside an open-ended prompt.

## A Useful Design Question
For every LLM call, ask: what is the smallest set of valid answers, what evidence determines the answer, and how will the application verify it? If the answer space is tiny and the evidence is structured, a traditional function or typed decision engine may be the better tool.

AI-native engineering is not about using an LLM everywhere. It is about matching the capability to the job—and saving expensive model reasoning for the problems that truly need it.

## The 60-Second Architecture Check
Write down the valid outputs, the evidence needed, and the cost of a wrong answer. If outputs are few and evidence is structured, start with normal code or a typed decision. Reach for an LLM only when language-based judgment changes the result.`,
      date: "2026-09-22",
      tags: ["Typed Outputs", "LLM Cost Optimization", "AI Decision Systems", "AI Agents", "Deterministic AI", "Parallel Processing", "AI Engineering"],
      readTime: "4 min read",
      coverImage: "/images/blog/context-engineering.png",
      figures: [{ afterHeading: "typed-outputs-are-an-engineering-advantage", src: "/images/blog/context-packet-diagram.png", alt: "A structured decision workspace receiving only selected inputs", caption: "Constrained inputs and typed outputs make automated decisions easier to validate." }],
      format: "Quick read",
      sourceUrl: "https://x.com/ojhaabhishekraj/status/2102400361155993684",
      sourceLabel: "Read the original post on X",
      subheadings: [
        { id: "not-every-decision-needs-an-llm", title: "Not Every Decision Needs an LLM", level: 1 },
        { id: "typed-outputs-are-an-engineering-advantage", title: "Typed Outputs Are an Engineering Advantage", level: 1 },
        { id: "parallel-decisions-improve-the-critical-path", title: "Parallel Decisions Improve the Critical Path", level: 1 },
        { id: "choose-the-smallest-reliable-system", title: "Choose the Smallest Reliable System", level: 1 },
        { id: "a-useful-design-question", title: "A Useful Design Question", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
    {
      slug: "ai-native-engineering-playbook-2026",
      title: "The AI-Native Engineering Playbook: Context, Agents, Graphs, and Trust",
      excerpt: "The durable advantage in AI-native engineering is not a single model or framework. It is a delivery system built around useful context, bounded agency, verification, and learning.",
      content: `AI-native engineering is maturing from experimentation into a practical operating model. The tools will keep changing, but the underlying lesson is stable: reliable AI systems are designed as systems. They need context, clear responsibilities, safe capabilities, verification, and feedback.

My point of view comes from shipping systems where automation has to coexist with people doing real work: browser flows, business rules, internal queues, and customer-facing applications. In that world, an AI feature is only useful when it reduces work without creating a hidden support burden. This is the playbook I would use on my own production workflow—not a list of things an ideal team should do someday.

## Context Is the Foundation
An AI agent cannot make a good decision without a current goal, relevant facts, constraints, and source-of-truth access. Context engineering should be treated as product and platform work, not as a last-minute prompt edit. Curated information, clear architecture, and trustworthy retrieval give every agent a better starting point.

## Agency Must Be Bounded
Give agents the smallest useful authority. Use tools with narrow inputs and predictable outputs. Separate reading from writing, add approval gates for meaningful side effects, and preserve an audit trail. Autonomy is valuable only when it is paired with accountability and recovery.

## Use the Right Workflow Shape
One agent is often enough for a focused task. Use subagents when responsibilities are independent and their outputs can be checked. Use a workflow graph when work has durable state, branches, parallel steps, retries, or human approvals. A more complicated architecture should earn its cost through better outcomes.

## Verification Creates Trust
AI-generated output is not the finish line. Tests, validators, source citations, policy checks, previews, code review, and production monitoring are how a team knows whether the work is correct. Design verification into the workflow rather than asking someone to inspect everything at the end.

## Make Learning Part of Delivery
Log failures safely, review representative runs, and turn recurring mistakes into better context, tools, tests, or policies. The organizations that compound value from AI will be the ones that learn from every interaction instead of repeatedly rediscovering the same failure modes.

## The Practical Next Step
Choose one workflow where quality can be measured: code maintenance, internal support, document processing, or research. Map the current process, identify the necessary context and guardrails, run a limited pilot, and evaluate the result against the old way of working. Build capability one verified workflow at a time.

The future of engineering is not engineers versus AI. It is engineers building better systems of collaboration—with AI earning more responsibility as the evidence supports it.

## The One-Sentence Playbook
Give an agent the smallest useful context, the narrowest useful authority, a way to prove its work, and a clear path to ask for help. Every reliable AI-native workflow is a variation of that sentence.`,
      date: "2026-10-07",
      tags: ["AI-Native Engineering", "AI Engineering", "AI Agents", "Context Engineering", "Graph Engineering", "Subagents", "Agentic AI", "Responsible AI"],
      readTime: "8 min read",
      coverImage: "/images/blog/ai-native-engineering.png",
      figures: [{ afterHeading: "use-the-right-workflow-shape", src: "/images/blog/agent-orchestration-diagram.png", alt: "An orchestrated AI workflow with specialist branches, validation, and human approval", caption: "Choose the smallest workflow shape that makes responsibility and recovery clear." }],
      format: "Deep dive",
      subheadings: [
        { id: "context-is-the-foundation", title: "Context Is the Foundation", level: 1 },
        { id: "agency-must-be-bounded", title: "Agency Must Be Bounded", level: 1 },
        { id: "use-the-right-workflow-shape", title: "Use the Right Workflow Shape", level: 1 },
        { id: "verification-creates-trust", title: "Verification Creates Trust", level: 1 },
        { id: "make-learning-part-of-delivery", title: "Make Learning Part of Delivery", level: 1 },
        { id: "the-practical-next-step", title: "The Practical Next Step", level: 1 }
      ],
      author: { name: "Abhishek Raj", bio: "Abhishek Raj is a software developer at RegisterKaro and part-time entrepreneur", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U" }
    },
  ]
  
