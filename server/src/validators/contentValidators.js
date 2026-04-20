import { z } from 'zod';

const requiredText = (label) => z.string().min(1, `${label} is required`);
const optionalUrl = z.string().url('Enter a valid URL').or(z.literal('')).optional().default('');
const optionalText = z.string().optional().default('');
const csv = z.array(z.string()).optional().default([]);
const numberField = z.coerce.number().optional().default(0);

export const profileSchema = z.object({
  fullName: requiredText('Full name'),
  headline: requiredText('Headline'),
  tagline: requiredText('Tagline'),
  location: requiredText('Location'),
  email: z.string().email('Valid email is required'),
  phone: requiredText('Phone'),
  avatarUrl: optionalUrl,
  resumeUrl: optionalUrl,
  yearsExperience: optionalText,
  availability: optionalText,
  shortBio: optionalText,
  stats: z.array(z.object({ label: z.string(), value: z.string() })).optional().default([]),
});
export const heroSchema = z.object({
  badge: optionalText,
  eyebrow: optionalText,
  title: requiredText('Title'),
  highlightedName: requiredText('Highlighted name'),
  description: requiredText('Description'),
  primaryCtaText: optionalText,
  primaryCtaLink: optionalText,
  secondaryCtaText: optionalText,
  secondaryCtaLink: optionalText,
  heroImageUrl: optionalUrl,
});
export const aboutSchema = z.object({
  heading: requiredText('Heading'),
  summary: requiredText('Summary'),
  story: requiredText('Story'),
  approach: optionalText,
  profileImageUrl: optionalUrl,
  facts: z.array(z.object({ label: z.string(), value: z.string() })).optional().default([]),
});
export const contactInfoSchema = z.object({
  email: z.string().email('Valid email is required'),
  phone: optionalText,
  location: optionalText,
  timezone: optionalText,
  calendlyUrl: optionalUrl,
  whatsappUrl: optionalUrl,
  intro: optionalText,
});
export const siteSettingsSchema = z.object({
  siteTitle: requiredText('Site title'),
  siteDescription: requiredText('Site description'),
  footerText: optionalText,
  seoKeywords: csv,
  resumeUrl: optionalUrl,
  openToWork: z.coerce.boolean().optional().default(true),
  testimonialsEnabled: z.coerce.boolean().optional().default(false),
});
export const socialLinkSchema = z.object({ label: requiredText('Label'), icon: optionalText, url: z.string().url('Valid URL is required'), sortOrder: numberField });
export const serviceSchema = z.object({ title: requiredText('Title'), description: requiredText('Description'), icon: optionalText, sortOrder: numberField });
export const skillCategorySchema = z.object({ name: requiredText('Category name'), description: optionalText, sortOrder: numberField });
export const skillSchema = z.object({ category: requiredText('Category'), name: requiredText('Skill name'), icon: optionalText, level: z.coerce.number().min(1).max(100), sortOrder: numberField });
export const projectSchema = z.object({ title: requiredText('Title'), slug: optionalText, excerpt: requiredText('Excerpt'), description: requiredText('Description'), imageUrl: optionalUrl, technologies: csv, githubUrl: optionalUrl, liveUrl: optionalUrl, role: optionalText, year: optionalText, featured: z.coerce.boolean().optional().default(false), highlights: csv, sortOrder: numberField });
export const experienceSchema = z.object({ company: requiredText('Company'), role: requiredText('Role'), location: optionalText, period: requiredText('Period'), current: z.coerce.boolean().optional().default(false), description: requiredText('Description'), highlights: csv, sortOrder: numberField });
export const educationSchema = z.object({ institution: requiredText('Institution'), degree: requiredText('Degree'), field: optionalText, period: requiredText('Period'), grade: optionalText, description: optionalText, sortOrder: numberField });
export const certificationSchema = z.object({ title: requiredText('Title'), issuer: requiredText('Issuer'), issuedAt: optionalText, credentialId: optionalText, credentialUrl: optionalUrl, description: optionalText, sortOrder: numberField });
export const achievementSchema = z.object({ title: requiredText('Title'), description: requiredText('Description'), dateLabel: optionalText, icon: optionalText, sortOrder: numberField });
