import PageHeader from '../components/PageHeader.jsx';
import SingletonSection from '../components/SingletonSection.jsx';
import { useSingletonResource } from '../hooks/useResource.js';

const profileFields = [
  { name: 'fullName', label: 'Full name', required: true },
  { name: 'headline', label: 'Headline', required: true },
  { name: 'tagline', label: 'Tagline', required: true, span: 2 },
  { name: 'location', label: 'Location', required: true },
  { name: 'email', label: 'Email', required: true, type: 'email' },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'avatarUrl', label: 'Avatar image URL', type: 'file-url', accept: 'image/*' },
  { name: 'resumeUrl', label: 'Resume URL', type: 'file-url', accept: 'application/pdf' },
  { name: 'yearsExperience', label: 'Experience summary' },
  { name: 'availability', label: 'Availability' },
  { name: 'shortBio', label: 'Short bio', type: 'textarea', span: 2 },
  { name: 'stats', label: 'Stats', type: 'pairs', span: 2, help: 'One per line: label|value' },
];

const heroFields = [
  { name: 'badge', label: 'Badge' },
  { name: 'eyebrow', label: 'Eyebrow' },
  { name: 'title', label: 'Title', required: true, span: 2 },
  { name: 'highlightedName', label: 'Highlighted name', required: true },
  { name: 'heroImageUrl', label: 'Hero image', type: 'file-url', accept: 'image/*' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2 },
  { name: 'primaryCtaText', label: 'Primary CTA text' },
  { name: 'primaryCtaLink', label: 'Primary CTA link' },
  { name: 'secondaryCtaText', label: 'Secondary CTA text' },
  { name: 'secondaryCtaLink', label: 'Secondary CTA link' },
];

const aboutFields = [
  { name: 'heading', label: 'Heading', required: true, span: 2 },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true, span: 2 },
  { name: 'story', label: 'Story', type: 'textarea', required: true, span: 2 },
  { name: 'approach', label: 'Approach', type: 'textarea', span: 2 },
  { name: 'profileImageUrl', label: 'Profile image', type: 'file-url', accept: 'image/*', span: 2 },
  { name: 'facts', label: 'Facts', type: 'pairs', span: 2, help: 'One per line: label|value' },
];

const contactFields = [
  { name: 'email', label: 'Email', required: true, type: 'email' },
  { name: 'phone', label: 'Phone' },
  { name: 'location', label: 'Location' },
  { name: 'timezone', label: 'Timezone' },
  { name: 'calendlyUrl', label: 'Calendly URL' },
  { name: 'whatsappUrl', label: 'WhatsApp URL' },
  { name: 'intro', label: 'Intro', type: 'textarea', span: 2 },
];

const settingsFields = [
  { name: 'siteTitle', label: 'Site title', required: true, span: 2 },
  { name: 'siteDescription', label: 'Site description', type: 'textarea', required: true, span: 2 },
  { name: 'footerText', label: 'Footer text', type: 'textarea', span: 2 },
  { name: 'seoKeywords', label: 'SEO keywords', type: 'csv', span: 2, help: 'Comma-separated keywords' },
  { name: 'resumeUrl', label: 'Global resume URL', type: 'file-url', accept: 'application/pdf', span: 2 },
  { name: 'openToWork', label: 'Open to work', type: 'checkbox' },
  { name: 'testimonialsEnabled', label: 'Testimonials enabled', type: 'checkbox' },
];

export default function ContentPage() {
  const profile = useSingletonResource('profile', 'profile');
  const hero = useSingletonResource('hero', 'hero');
  const about = useSingletonResource('about', 'about');
  const contact = useSingletonResource('contact-info', 'contact-info');
  const settings = useSingletonResource('site-settings', 'site-settings');

  return (
    <div className="space-y-6">
      <PageHeader title="Core content" description="Manage singleton content blocks that power the premium public-facing portfolio experience." />
      <SingletonSection title="Profile" description="Identity, availability, resume, and portfolio summary details." fields={profileFields} resource={profile} />
      <SingletonSection title="Hero" description="The highest-impact section on the homepage." fields={heroFields} resource={hero} />
      <SingletonSection title="About" description="Narrative copy and personal context for the about section." fields={aboutFields} resource={about} />
      <SingletonSection title="Contact info" description="Direct contact points and intro copy used by the portfolio contact section." fields={contactFields} resource={contact} />
      <SingletonSection title="Site settings" description="SEO, footer copy, and global portfolio flags." fields={settingsFields} resource={settings} />
    </div>
  );
}
