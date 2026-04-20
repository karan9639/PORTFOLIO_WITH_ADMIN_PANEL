import { MoonStar, SunMedium } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-teal-300/40 hover:text-teal-200"
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
      aria-pressed={darkMode}
    >
      {darkMode ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}
