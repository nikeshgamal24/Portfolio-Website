export const siteConfig = {
  // Basic Info
  name: "Your Name",
  role: "Full Stack Developer",
  tagline: "Building digital experiences that matter",
  
  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your.email@example.com",
    twitter: "https://twitter.com/yourusername"
  },
  
  // GitHub Configuration
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || "yourusername",
  
  // Project Filters
  projectFilters: {
    minStars: 0,
    allowedTopics: ["portfolio", "showcase", "demo", "web-app", "react", "node"],
    includeRepos: ["portfolio-website", "awesome-project"], // Explicit repos to include
    excludeRepos: ["old-portfolio", "test-repo"] // Repos to exclude
  },
  
  // SEO
  seo: {
    title: "Your Name - Full Stack Developer",
    description: "Full Stack Developer passionate about building modern web applications with React, Node.js, and cutting-edge technologies.",
    image: "/og.png"
  },
  
  // Contact
  contact: {
    email: "your.email@example.com",
    location: "Your City, Country",
    available: true
  }
}
