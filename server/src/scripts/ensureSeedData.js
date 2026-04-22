import env from "../config/env.js";
import { Admin } from "../models/Admin.js";
import { Profile } from "../models/Profile.js";
import { Hero } from "../models/Hero.js";
import { About } from "../models/About.js";
import { ContactInfo } from "../models/ContactInfo.js";
import { SiteSettings } from "../models/SiteSettings.js";
import { SocialLink } from "../models/SocialLink.js";
import { Service } from "../models/Service.js";
import { SkillCategory } from "../models/SkillCategory.js";
import { Skill } from "../models/Skill.js";
import Project from "../models/Project.js";
import { Experience } from "../models/Experience.js";
import { Education } from "../models/Education.js";
import { Certification } from "../models/Certification.js";
import { Achievement } from "../models/Achievement.js";

function slugify(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function upsertSingleton(Model, payload) {
  await Model.findOneAndUpdate(
    { singletonKey: "default" },
    { ...payload, singletonKey: "default" },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
  );
}

async function upsertRecord(Model, filter, payload) {
  await Model.findOneAndUpdate(filter, payload, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  });
}

function normalizeProject(project) {
  return {
    title: project.title,
    slug: slugify(project.slug || project.title),
    summary: project.summary || project.excerpt || "",
    description: project.description || "",
    imageUrl: project.imageUrl || "",
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    caseStudyUrl: project.caseStudyUrl || "",
    category: project.category || project.projectType || "",
    status: project.status || "",
    duration: project.duration || "",
    techStack: project.techStack || project.technologies || [],
    highlights: project.highlights || [],
    featured: Boolean(project.featured),
    sortOrder: project.sortOrder ?? 0,
  };
}

async function upsertProject(project) {
  const normalized = normalizeProject(project);

  await Project.findOneAndUpdate({ slug: normalized.slug }, normalized, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  });
}

export async function ensureSeedData() {
  const existingAdmin = await Admin.findOne({
    email: env.defaultAdminEmail.toLowerCase(),
  });

  if (!existingAdmin) {
    await Admin.create({
      name: env.defaultAdminName,
      email: env.defaultAdminEmail.toLowerCase(),
      password: env.defaultAdminPassword,
    });
  }

  await upsertSingleton(Profile, {
    fullName: "Karan Singh",
    headline: "Full-stack developer building clean, scalable web products",
    tagline:
      "React, Node.js, MongoDB, and modern product-focused frontend engineering",
    location: "Agra, Uttar Pradesh, India",
    email: "kvnisad18114982@gmail.com",
    phone: "+91 7055424269",
    avatarUrl: "/assets/karan.svg",
    resumeUrl: "/assets/Karan_Singh_Resume.pdf",
    yearsExperience: "6+ months project experience",
    availability:
      "Available for internships, freelance work, and junior product roles",
    currentRole: "Full-stack Developer",
    currentCompany: "Independent / self-directed projects",
    preferredRoles: [
      "Frontend Developer",
      "Full-stack Developer",
      "Product-focused Engineer",
    ],
    specializations: [
      "Responsive UI engineering",
      "REST API development",
      "Portfolio and admin systems",
    ],
    currentlyLearning: [
      "TypeScript",
      "System design fundamentals",
      "Cloud deployment workflows",
    ],
    languages: [
      { label: "Hindi", value: "Native" },
      { label: "English", value: "Professional working proficiency" },
    ],
    shortBio:
      "I build responsive, modern, full-stack experiences with a strong eye for usability, clean implementation, and maintainable code.",
    stats: [
      { label: "Projects shipped", value: "6+" },
      { label: "Problems solved", value: "500+" },
      { label: "Primary stack", value: "MERN" },
    ],
  });

  await upsertSingleton(Hero, {
    badge: "Open to opportunities",
    eyebrow: "Premium portfolio platform",
    title:
      "I build thoughtful digital products that feel polished, fast, and scalable.",
    highlightedName: "Karan Singh",
    description:
      "Full-stack developer focused on building recruiter-friendly portfolios, conversion-focused websites, and production-ready web apps with modern React and Node.js architecture.",
    availabilityNote:
      "Open to internships, freelance projects, and junior full-stack opportunities.",
    supportingPoints: [
      "MERN stack delivery",
      "Responsive product interfaces",
      "Admin dashboard architecture",
    ],
    primaryCtaText: "Explore my work",
    primaryCtaLink: "#projects",
    secondaryCtaText: "Let’s talk",
    secondaryCtaLink: "#contact",
    heroImageUrl: "/assets/kvs.svg",
  });

  await upsertSingleton(About, {
    heading: "Crafting modern web experiences with product thinking.",
    summary:
      "I care about more than writing code. I focus on shipping interfaces that feel clear, purposeful, and professional.",
    story:
      "My journey into software engineering grew from curiosity about solving problems and building useful digital systems. Today I enjoy working across frontend and backend layers, turning raw ideas into complete products with clean interfaces, secure APIs, and practical content management.",
    approach:
      "I prefer simple architecture, strong fundamentals, responsive design, and thoughtful details that make products feel trustworthy.",
    profileImageUrl: "/assets/kvs.svg",
    strengths: [
      "Clean component architecture",
      "Backend CRUD systems",
      "UI polish and responsiveness",
    ],
    interests: [
      "Developer tools",
      "Portfolio products",
      "Performance-minded interfaces",
    ],
    facts: [
      { label: "Location", value: "Agra, Uttar Pradesh, India" },
      { label: "Education", value: "B.Tech in Computer Science" },
      { label: "Experience", value: "MERN stack projects" },
      { label: "Focus", value: "Full-stack product development" },
    ],
  });

  await upsertSingleton(ContactInfo, {
    email: "kvnisad18114982@gmail.com",
    phone: "+91 7055424269",
    location: "Agra, Uttar Pradesh, India",
    timezone: "Asia/Kolkata",
    preferredContactMethod: "Email",
    responseTime: "Usually within 24 hours",
    intro:
      "Have a portfolio project, internship, freelance opportunity, or collaboration in mind? Send a message and I’ll get back to you soon.",
  });

  await upsertSingleton(SiteSettings, {
    siteTitle: "Karan Singh | Full-stack Developer",
    siteDescription:
      "Premium full-stack portfolio and admin platform built with React, Node.js, Express, and MongoDB.",
    footerText:
      "Designed and engineered as a production-style portfolio platform.",
    seoKeywords: [
      "React developer",
      "MERN stack",
      "portfolio website",
      "full-stack developer",
      "admin dashboard",
    ],
    canonicalUrl: "",
    ogImageUrl: "/assets/kvs.svg",
    resumeUrl: "/assets/Karan_Singh_Resume.pdf",
    openToWork: true,
    testimonialsEnabled: false,
  });

  const socialLinks = [
    {
      filter: { label: "GitHub" },
      payload: {
        label: "GitHub",
        icon: "github",
        url: "https://github.com/karan9639",
        sortOrder: 1,
      },
    },
    {
      filter: { label: "LinkedIn" },
      payload: {
        label: "LinkedIn",
        icon: "linkedin",
        url: "https://www.linkedin.com/in/karan-singh-20889a221/",
        sortOrder: 2,
      },
    },
    {
      filter: { label: "Email" },
      payload: {
        label: "Email",
        icon: "mail",
        url: "mailto:kvnisad18114982@gmail.com",
        sortOrder: 3,
      },
    },
  ];

  for (const item of socialLinks) {
    await upsertRecord(SocialLink, item.filter, item.payload);
  }

  const services = [
    {
      filter: { title: "Full-stack product development" },
      payload: {
        title: "Full-stack product development",
        description:
          "Designing and shipping scalable React and Node.js products with strong UX and maintainable architecture.",
        icon: "layout-dashboard",
        deliverables: ["React frontends", "Express APIs", "MongoDB schemas"],
        sortOrder: 1,
      },
    },
    {
      filter: { title: "Portfolio and brand systems" },
      payload: {
        title: "Portfolio and brand systems",
        description:
          "Building premium personal brand experiences for engineers, founders, and freelance developers.",
        icon: "sparkles",
        deliverables: ["Landing pages", "Admin panels", "Content-driven UI"],
        sortOrder: 2,
      },
    },
    {
      filter: { title: "Backend and API engineering" },
      payload: {
        title: "Backend and API engineering",
        description:
          "Creating secure REST APIs, admin systems, and data models that scale beyond MVP stage.",
        icon: "server",
        deliverables: [
          "Authentication",
          "CRUD workflows",
          "File upload systems",
        ],
        sortOrder: 3,
      },
    },
  ];

  for (const item of services) {
    await upsertRecord(Service, item.filter, item.payload);
  }

  const skillCategories = [
    { name: "Frontend", description: "Modern UI engineering", sortOrder: 1 },
    {
      name: "Backend",
      description: "API and application architecture",
      sortOrder: 2,
    },
    {
      name: "Database & Tools",
      description: "Delivery, collaboration, and data",
      sortOrder: 3,
    },
  ];

  for (const category of skillCategories) {
    await upsertRecord(SkillCategory, { name: category.name }, category);
  }

  const categoryDocs = await SkillCategory.find({
    name: { $in: skillCategories.map((item) => item.name) },
  });

  const categoryByName = Object.fromEntries(
    categoryDocs.map((item) => [item.name, item._id]),
  );

  const skills = [
    {
      name: "React",
      icon: "atom",
      level: 92,
      sortOrder: 1,
      category: categoryByName.Frontend,
    },
    {
      name: "Tailwind CSS",
      icon: "palette",
      level: 88,
      sortOrder: 2,
      category: categoryByName.Frontend,
    },
    {
      name: "JavaScript",
      icon: "code-xml",
      level: 90,
      sortOrder: 3,
      category: categoryByName.Frontend,
    },
    {
      name: "Node.js",
      icon: "server",
      level: 85,
      sortOrder: 4,
      category: categoryByName.Backend,
    },
    {
      name: "Express",
      icon: "network",
      level: 82,
      sortOrder: 5,
      category: categoryByName.Backend,
    },
    {
      name: "MongoDB",
      icon: "database",
      level: 80,
      sortOrder: 6,
      category: categoryByName["Database & Tools"],
    },
    {
      name: "Git & GitHub",
      icon: "github",
      level: 84,
      sortOrder: 7,
      category: categoryByName["Database & Tools"],
    },
    {
      name: "Postman",
      icon: "rocket",
      level: 77,
      sortOrder: 8,
      category: categoryByName["Database & Tools"],
    },
  ];

  for (const skill of skills) {
    await upsertRecord(Skill, { name: skill.name }, skill);
  }

  const projects = [
    {
      title: "Lab Recipe Management",
      summary:
        "A full-stack recipe management application with clean UX and organized data flows.",
      description:
        "A portfolio-ready full-stack recipe platform where users can create, organize, and browse recipes. The project demonstrates CRUD workflows, responsive interfaces, API integration, and thoughtful data modeling.",
      imageUrl: "/assets/images/lab.png",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/karan9639/Lab",
      liveUrl: "https://labrecipe.vercel.app/recipes",
      duration: "4 weeks",
      category: "Full-stack web app",
      status: "Live",
      featured: true,
      highlights: [
        "Responsive recipe dashboard",
        "RESTful backend architecture",
        "MongoDB-based data storage",
      ],
      sortOrder: 1,
    },
    {
      title: "Restaurant Website",
      summary:
        "A polished restaurant experience focused on presentation, content structure, and conversion.",
      description:
        "A marketing-forward restaurant website designed for strong visual storytelling, clear menu presentation, and a mobile-first browsing experience.",
      imageUrl: "/assets/images/restaurant.png",
      techStack: ["React", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/karan9639",
      duration: "2 weeks",
      category: "Marketing website",
      status: "Prototype",
      featured: true,
      highlights: [
        "Premium visual design",
        "Mobile-first layout",
        "CTA-driven content sections",
      ],
      sortOrder: 2,
    },
    {
      title: "Weather Dashboard",
      summary:
        "A practical dashboard for live weather insights with external API integration.",
      description:
        "Weather dashboard that fetches real-time weather information, improving API handling and data presentation for end users.",
      imageUrl: "/assets/images/weather.png",
      techStack: ["React", "REST API", "CSS"],
      githubUrl: "https://github.com/karan9639",
      duration: "1 week",
      category: "Dashboard",
      status: "Completed",
      featured: false,
      highlights: [
        "External API integration",
        "Search-based weather flow",
        "Clean dashboard UI",
      ],
      sortOrder: 3,
    },
    {
      title: "Task Planner App",
      summary:
        "A focused task management app designed to reinforce state, forms, and usability.",
      description:
        "A lightweight productivity app centered on intuitive task flows and clean management of personal to-dos.",
      imageUrl: "/assets/images/todo.png",
      techStack: ["React", "Local Storage", "Tailwind CSS"],
      githubUrl: "https://github.com/karan9639",
      duration: "1 week",
      category: "Productivity app",
      status: "Completed",
      featured: false,
      highlights: [
        "Fast UI interactions",
        "Simple persistence layer",
        "Strong component structure",
      ],
      sortOrder: 4,
    },
  ];

  for (const project of projects) {
    await upsertProject(project);
  }

  const experiences = [
    {
      company: "Self-directed projects",
      role: "Full-stack Developer",
      location: "Agra, India",
      period: "2024 - Present",
      employmentType: "Independent",
      stack: ["React", "Node.js", "MongoDB"],
      current: true,
      description:
        "Building portfolio-grade products across the MERN stack, refining frontend execution, backend architecture, and deployment workflows.",
      highlights: [
        "Developed production-style portfolio and CRUD systems",
        "Strengthened API design and content management patterns",
        "Focused on responsive UI and product polish",
      ],
      sortOrder: 1,
    },
    {
      company: "Academic projects & internships",
      role: "Software Engineer Trainee",
      location: "India",
      period: "2023 - 2024",
      employmentType: "Training / internship projects",
      stack: ["React", "Express", "Problem solving"],
      current: false,
      description:
        "Worked on hands-on software engineering assignments with emphasis on frontend implementation, backend integrations, and coding problem solving.",
      highlights: [
        "Built multiple React projects",
        "Improved debugging and development workflow",
        "Practiced DSA and core CS concepts",
      ],
      sortOrder: 2,
    },
  ];

  for (const item of experiences) {
    await upsertRecord(
      Experience,
      { company: item.company, role: item.role },
      item,
    );
  }

  const education = [
    {
      institution: "B.Tech Program",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      period: "2020 - 2024",
      description:
        "Built strong fundamentals in data structures, algorithms, software engineering, databases, and web technologies.",
      sortOrder: 1,
    },
    {
      institution: "Kendriya Vidyalaya",
      degree: "Senior Secondary Education",
      field: "PCM",
      period: "2018 - 2020",
      description:
        "Focused on mathematics, physics, and computer science fundamentals.",
      sortOrder: 2,
    },
  ];

  for (const item of education) {
    await upsertRecord(
      Education,
      { institution: item.institution, degree: item.degree },
      item,
    );
  }

  const certifications = [
    {
      title: "MERN Stack Development Practice",
      issuer: "Self-paced learning",
      issuedAt: "2025",
      skillsCovered: ["MongoDB", "Express", "React", "Node.js"],
      description:
        "Hands-on project practice across MongoDB, Express, React, and Node.js.",
      sortOrder: 1,
    },
    {
      title: "Problem Solving & DSA",
      issuer: "Competitive programming platforms",
      issuedAt: "2024",
      skillsCovered: ["Algorithms", "Data structures", "Debugging"],
      description:
        "Consistent algorithmic practice on LeetCode, CodeChef, and similar platforms.",
      sortOrder: 2,
    },
  ];

  for (const item of certifications) {
    await upsertRecord(Certification, { title: item.title }, item);
  }

  const achievements = [
    {
      title: "GATE 2025 Qualified",
      description:
        "Qualified GATE, demonstrating strong computer science fundamentals and disciplined preparation.",
      dateLabel: "2025",
      icon: "trophy",
      sortOrder: 1,
    },
    {
      title: "92 percentile in JEE Main",
      description:
        "Strong percentile performance demonstrating analytical and mathematical ability.",
      dateLabel: "2020",
      icon: "medal",
      sortOrder: 2,
    },
    {
      title: "500+ coding problems solved",
      description:
        "Solved hundreds of DSA and problem-solving questions across major coding platforms.",
      dateLabel: "Ongoing",
      icon: "code-xml",
      sortOrder: 3,
    },
  ];

  for (const item of achievements) {
    await upsertRecord(Achievement, { title: item.title }, item);
  }
}
