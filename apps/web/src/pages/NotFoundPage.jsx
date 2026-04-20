import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container-shell py-24">
      <div className="glass-card rounded-[2rem] p-10 text-center shadow-soft">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-500">404</div>
        <h1 className="mt-4 text-4xl font-semibold text-white">This page doesn’t exist.</h1>
        <p className="mt-4 text-slate-400">Let’s get you back to the portfolio homepage.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950">Go home</Link>
      </div>
    </div>
  );
}
