import {
  Atom,
  Award,
  BriefcaseBusiness,
  Code2,
  CodeXml,
  Database,
  Github,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Linkedin,
  Mail,
  Medal,
  Network,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Trophy,
} from 'lucide-react';

const iconMap = {
  atom: Atom,
  award: Award,
  briefcase: BriefcaseBusiness,
  'briefcase-business': BriefcaseBusiness,
  code2: Code2,
  'code-xml': CodeXml,
  database: Database,
  github: Github,
  globe: Globe,
  graduationcap: GraduationCap,
  'layout-dashboard': LayoutDashboard,
  linkedin: Linkedin,
  mail: Mail,
  medal: Medal,
  network: Network,
  palette: Palette,
  rocket: Rocket,
  server: Server,
  sparkles: Sparkles,
  trophy: Trophy,
};

export function DynamicIcon({ name = 'sparkles', className = 'h-5 w-5' }) {
  const normalized = name.toLowerCase();
  const Icon = iconMap[normalized] || Sparkles;
  return <Icon className={className} />;
}
