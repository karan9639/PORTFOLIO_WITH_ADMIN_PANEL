import env from '../config/env.js';
import { Admin } from '../models/Admin.js';
import { Profile } from '../models/Profile.js';
import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';
import { ContactInfo } from '../models/ContactInfo.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { SocialLink } from '../models/SocialLink.js';
import { Service } from '../models/Service.js';
import { SkillCategory } from '../models/SkillCategory.js';
import { Skill } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Certification } from '../models/Certification.js';
import { Achievement } from '../models/Achievement.js';

async function upsertSingleton(Model, payload) {
  await Model.findOneAndUpdate({ singletonKey: 'default' }, { ...payload, singletonKey: 'default' }, { upsert: true });
}

export async function ensureSeedData() {
  const existingAdmin = await Admin.findOne({ email: env.defaultAdminEmail.toLowerCase() });
  if (!existingAdmin) {
    await Admin.create({ name: env.defaultAdminName, email: env.defaultAdminEmail.toLowerCase(), password: env.defaultAdminPassword });
  }

  await upsertSingleton(Profile, {
    fullName: 'Karan Singh',
    headline: 'Full-stack developer building clean, scalable web products',
    tagline: 'React, Node.js, MongoDB, and modern product-focused frontend engineering',
    location: 'Agra, Uttar Pradesh, India',
    email: 'kvnisad18114982@gmail.com',
    phone: '+91 7055424269',
    avatarUrl: '/assets/karan.svg',
    resumeUrl: '/assets/Karan_Singh_Resume.pdf',
    yearsExperience: '6+ months project experience',
    availability: 'Available for internships, freelance work, and junior product roles',
    shortBio: 'I build responsive, modern, full-stack experiences with a strong eye for usability, clean implementation, and maintainable code.',
    stats: [{ label: 'Projects shipped', value: '6+' }, { label: 'Problems solved', value: '500+' }, { label: 'Primary stack', value: 'MERN' }],
  });
  await upsertSingleton(Hero, {
    badge: 'Open to opportunities',
    eyebrow: 'Premium portfolio platform',
    title: 'I build thoughtful digital products that feel polished, fast, and scalable.',
    highlightedName: 'Karan Singh',
    description: 'Full-stack developer focused on building recruiter-friendly portfolios, conversion-focused websites, and production-ready web apps with modern React and Node.js architecture.',
    primaryCtaText: 'Explore my work',
    primaryCtaLink: '#projects',
    secondaryCtaText: 'Let’s talk',
    secondaryCtaLink: '#contact',
    heroImageUrl: '/assets/kvs.svg',
  });
  await upsertSingleton(About, {
    heading: 'Crafting modern web experiences with product thinking.',
    summary: 'I care about more than writing code. I focus on shipping interfaces that feel clear, purposeful, and professional.',
    story: 'My journey into software engineering grew from curiosity about solving problems and building useful digital systems. Today I enjoy working across frontend and backend layers, turning raw ideas into complete products with clean interfaces, secure APIs, and practical content management.',
    approach: 'I prefer simple architecture, strong fundamentals, responsive design, and thoughtful details that make products feel trustworthy.',
    profileImageUrl: '/assets/kvs.svg',
    facts: [{ label: 'Location', value: 'Agra, Uttar Pradesh, India' }, { label: 'Education', value: 'B.Tech in Computer Science' }, { label: 'Experience', value: 'MERN stack projects' }, { label: 'Focus', value: 'Full-stack product development' }],
  });
  await upsertSingleton(ContactInfo, { email: 'kvnisad18114982@gmail.com', phone: '+91 7055424269', location: 'Agra, Uttar Pradesh, India', timezone: 'Asia/Kolkata', intro: 'Have a portfolio project, internship, freelance opportunity, or collaboration in mind? Send a message and I’ll get back to you soon.' });
  await upsertSingleton(SiteSettings, { siteTitle: 'Karan Singh | Full-stack Developer', siteDescription: 'Premium full-stack portfolio and admin platform built with React, Node.js, Express, and MongoDB.', footerText: 'Designed and engineered as a production-style portfolio platform.', seoKeywords: ['React developer', 'MERN stack', 'portfolio website', 'full-stack developer', 'admin dashboard'], resumeUrl: '/assets/Karan_Singh_Resume.pdf', openToWork: true, testimonialsEnabled: false });

  if ((await SocialLink.countDocuments()) === 0) await SocialLink.insertMany([{ label: 'GitHub', icon: 'github', url: 'https://github.com/karan9639', sortOrder: 1 }, { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/karan-singh-20889a221/', sortOrder: 2 }, { label: 'Email', icon: 'mail', url: 'mailto:kvnisad18114982@gmail.com', sortOrder: 3 }]);
  if ((await Service.countDocuments()) === 0) await Service.insertMany([{ title: 'Full-stack product development', description: 'Designing and shipping scalable React and Node.js products with strong UX and maintainable architecture.', icon: 'layout-dashboard', sortOrder: 1 }, { title: 'Portfolio and brand systems', description: 'Building premium personal brand experiences for engineers, founders, and freelance developers.', icon: 'sparkles', sortOrder: 2 }, { title: 'Backend and API engineering', description: 'Creating secure REST APIs, admin systems, and data models that scale beyond MVP stage.', icon: 'server', sortOrder: 3 }]);
  if ((await SkillCategory.countDocuments()) === 0) {
    const categories = await SkillCategory.insertMany([{ name: 'Frontend', description: 'Modern UI engineering', sortOrder: 1 }, { name: 'Backend', description: 'API and application architecture', sortOrder: 2 }, { name: 'Database & Tools', description: 'Delivery, collaboration, and data', sortOrder: 3 }]);
    const byName = Object.fromEntries(categories.map((category) => [category.name, category._id]));
    await Skill.insertMany([{ category: byName.Frontend, name: 'React', icon: 'atom', level: 92, sortOrder: 1 }, { category: byName.Frontend, name: 'Tailwind CSS', icon: 'palette', level: 88, sortOrder: 2 }, { category: byName.Frontend, name: 'JavaScript', icon: 'code-xml', level: 90, sortOrder: 3 }, { category: byName.Backend, name: 'Node.js', icon: 'server', level: 85, sortOrder: 4 }, { category: byName.Backend, name: 'Express', icon: 'network', level: 82, sortOrder: 5 }, { category: byName['Database & Tools'], name: 'MongoDB', icon: 'database', level: 80, sortOrder: 6 }, { category: byName['Database & Tools'], name: 'Git & GitHub', icon: 'github', level: 84, sortOrder: 7 }, { category: byName['Database & Tools'], name: 'Postman', icon: 'rocket', level: 77, sortOrder: 8 }]);
  }
  if ((await Project.countDocuments()) === 0) await Project.insertMany([
    { title: 'Lab Recipe Management', excerpt: 'A full-stack recipe management application with clean UX and organized data flows.', description: 'A portfolio-ready full-stack recipe platform where users can create, organize, and browse recipes. The project demonstrates CRUD workflows, responsive interfaces, API integration, and thoughtful data modeling.', imageUrl: '/assets/images/lab.png', technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'], githubUrl: 'https://github.com/karan9639/Lab', liveUrl: 'https://labrecipe.vercel.app/recipes', role: 'Full-stack Developer', year: '2025', featured: true, highlights: ['Responsive recipe dashboard', 'RESTful backend architecture', 'MongoDB-based data storage'], sortOrder: 1 },
    { title: 'Restaurant Website', excerpt: 'A polished restaurant experience focused on presentation, content structure, and conversion.', description: 'A marketing-forward restaurant website designed for strong visual storytelling, clear menu presentation, and a mobile-first browsing experience.', imageUrl: '/assets/images/restaurant.png', technologies: ['React', 'Tailwind CSS', 'Framer Motion'], githubUrl: 'https://github.com/karan9639', role: 'Frontend Developer', year: '2024', featured: true, highlights: ['Premium visual design', 'Mobile-first layout', 'CTA-driven content sections'], sortOrder: 2 },
    { title: 'Weather Dashboard', excerpt: 'A practical dashboard for live weather insights with external API integration.', description: 'Weather dashboard that fetches real-time weather information, improving API handling and data presentation for end users.', imageUrl: '/assets/images/weather.png', technologies: ['React', 'REST API', 'CSS'], githubUrl: 'https://github.com/karan9639', role: 'Frontend Developer', year: '2024', featured: false, highlights: ['External API integration', 'Search-based weather flow', 'Clean dashboard UI'], sortOrder: 3 },
    { title: 'Task Planner App', excerpt: 'A focused task management app designed to reinforce state, forms, and usability.', description: 'A lightweight productivity app centered on intuitive task flows and clean management of personal to-dos.', imageUrl: '/assets/images/todo.png', technologies: ['React', 'Local Storage', 'Tailwind CSS'], githubUrl: 'https://github.com/karan9639', role: 'Frontend Developer', year: '2024', featured: false, highlights: ['Fast UI interactions', 'Simple persistence layer', 'Strong component structure'], sortOrder: 4 },
  ]);
  if ((await Experience.countDocuments()) === 0) await Experience.insertMany([{ company: 'Self-directed projects', role: 'Full-stack Developer', location: 'Agra, India', period: '2024 - Present', current: true, description: 'Building portfolio-grade products across the MERN stack, refining frontend execution, backend architecture, and deployment workflows.', highlights: ['Developed production-style portfolio and CRUD systems', 'Strengthened API design and content management patterns', 'Focused on responsive UI and product polish'], sortOrder: 1 }, { company: 'Academic projects & internships', role: 'Software Engineer Trainee', location: 'India', period: '2023 - 2024', current: false, description: 'Worked on hands-on software engineering assignments with emphasis on frontend implementation, backend integrations, and coding problem solving.', highlights: ['Built multiple React projects', 'Improved debugging and development workflow', 'Practiced DSA and core CS concepts'], sortOrder: 2 }]);
  if ((await Education.countDocuments()) === 0) await Education.insertMany([{ institution: 'B.Tech Program', degree: 'Bachelor of Technology', field: 'Computer Science', period: '2020 - 2024', description: 'Built strong fundamentals in data structures, algorithms, software engineering, databases, and web technologies.', sortOrder: 1 }, { institution: 'Kendriya Vidyalaya', degree: 'Senior Secondary Education', field: 'PCM', period: '2018 - 2020', description: 'Focused on mathematics, physics, and computer science fundamentals.', sortOrder: 2 }]);
  if ((await Certification.countDocuments()) === 0) await Certification.insertMany([{ title: 'MERN Stack Development Practice', issuer: 'Self-paced learning', issuedAt: '2025', description: 'Hands-on project practice across MongoDB, Express, React, and Node.js.', sortOrder: 1 }, { title: 'Problem Solving & DSA', issuer: 'Competitive programming platforms', issuedAt: '2024', description: 'Consistent algorithmic practice on LeetCode, CodeChef, and similar platforms.', sortOrder: 2 }]);
  if ((await Achievement.countDocuments()) === 0) await Achievement.insertMany([{ title: 'GATE 2025 Qualified', description: 'Qualified GATE, demonstrating strong computer science fundamentals and disciplined preparation.', dateLabel: '2025', icon: 'trophy', sortOrder: 1 }, { title: '92 percentile in JEE Main', description: 'Strong percentile performance demonstrating analytical and mathematical ability.', dateLabel: '2020', icon: 'medal', sortOrder: 2 }, { title: '500+ coding problems solved', description: 'Solved hundreds of DSA and problem-solving questions across major coding platforms.', dateLabel: 'Ongoing', icon: 'code-xml', sortOrder: 3 }]);
}
