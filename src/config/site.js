export const siteConfig = {
  // Basic Info
  name: "Nikesh Gamal",
  role: "Software Engineer",
  tagline: "Driven By Collaboration and Innovation in Software Development",
  
  // Social Links
  social: {
    github: "https://github.com/nikeshgamal24",
    linkedin: "https://www.linkedin.com/in/nikesh-gamal-47a539290/",
    email: "mailto:nikeshgamal24@gmail.com",
    twitter: "https://twitter.com/nikeshgamal24"
  },
  
  // GitHub Configuration
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || "nikeshgamal24",
  
  // Project Filters
  projectFilters: {
    minStars: 0,
    allowedTopics: ["portfolio", "showcase", "demo", "web-app", "react", "node","javascript","php"],
    includeRepos: ["Portfolio-Website","Project-Phoenix", "Book-Recommendation-System", "Car-Price-Prediction-Project", "Medical-Insurance-Prediction-Project", "Bloodlink", "Charity-Auction-Site", "MathQuest-Backend", "Customer-Claim-Value-Forecasting-Project", "Advance-House-Prediction-Project-EDA-Section", "Churn-Modelling-ANN", "LSTM-Project"], // Explicit repos to include 
    // to include for future projects: crowdfundr. , math-quest , bloodlink (if possible) , 
    excludeRepos: ["old-portfolio", "test-repo"] // Repos to exclude
  },
  
  // SEO
  seo: {
    title: "Nikesh Gamal - Software Engineer",
    description: "Software Engineer passionate about building modern web applications with React, Node.js, and cutting-edge technologies.",
    image: "/og.png"
  },
  
  // Contact
  contact: {
    email: "nikeshgamal24@gmail.com",
    location: "Pokhara, Nepal",
    available: true
  }
}
