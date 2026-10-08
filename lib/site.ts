export const siteConfig = {
  name: "Abhishek Raj",
  url: "https://www.caffeineoperator.online",
  description:
    "Abhishek Raj is a software developer who writes practical guides on AI-native engineering, coding agents, browser automation, and building production software.",
  xHandle: "@ojhaabhishekraj",
  githubUrl: "https://github.com/abhishek141001",
  linkedinUrl: "https://www.linkedin.com/in/abhishek-raj-69b55a230/",
} as const

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString()
