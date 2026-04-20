import { Link, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import { useSiteData } from '../hooks/useSiteData.js';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Layout() {
  const { data } = useSiteData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (data?.siteSettings?.siteTitle) {
      document.title = data.siteSettings.siteTitle;
      const descriptionTag = document.querySelector('meta[name="description"]') || document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      descriptionTag.setAttribute('content', data.siteSettings.siteDescription || '');
      if (!descriptionTag.parentNode) document.head.appendChild(descriptionTag);
    }
  }, [data]);

  const profile = useMemo(() => data?.profile || {}, [data]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="container-shell flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200">KS</span>
            <div>
              <div>{profile.fullName || 'Portfolio'}</div>
              <div className="text-xs font-normal text-slate-400">Premium portfolio platform</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-teal-200">
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl || data?.siteSettings?.resumeUrl || '/assets/Karan_Singh_Resume.pdf'}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Resume
            </a>
            <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} />
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/5 bg-slate-900/95 lg:hidden">
            <div className="container-shell flex flex-col gap-4 py-5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">
                  {item.label}
                </a>
              ))}
              <a
                href={profile.resumeUrl || data?.siteSettings?.resumeUrl || '/assets/Karan_Singh_Resume.pdf'}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-teal-400 px-5 py-2.5 text-center text-sm font-semibold text-slate-950"
              >
                Resume
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <Outlet />

      <footer className="border-t border-white/5 py-10">
        <div className="container-shell flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{data?.siteSettings?.footerText || 'Built with React, Express, MongoDB, and care.'}</p>
          <div className="flex items-center gap-4">
            {(data?.socialLinks || []).map((item) => (
              <a key={item._id} href={item.url} target="_blank" rel="noreferrer" className="transition hover:text-teal-200">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
