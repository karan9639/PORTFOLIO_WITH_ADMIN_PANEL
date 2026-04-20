import { BarChart3, BriefcaseBusiness, FolderKanban, Inbox, Layers3, LogOut, Settings2, Share2, Sparkles } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogout } from '../hooks/useAuth.js';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/content', label: 'Content', icon: Settings2 },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/services', label: 'Services', icon: Sparkles },
  { to: '/social-links', label: 'Social links', icon: Share2 },
  { to: '/skills', label: 'Skills', icon: Layers3 },
  { to: '/career', label: 'Career', icon: BriefcaseBusiness },
  { to: '/messages', label: 'Messages', icon: Inbox },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout.mutateAsync();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="admin-shell grid gap-6 py-6 lg:grid-cols-[270px_1fr]">
        <aside className="admin-card sticky top-6 h-[calc(100vh-3rem)] overflow-hidden p-4">
          <div className="mb-8 flex items-center gap-3 px-3 pt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200">KS</div>
            <div>
              <div className="font-semibold text-white">Portfolio Admin</div>
              <div className="text-sm text-slate-400">Content operations</div>
            </div>
          </div>

          <nav className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      isActive ? 'bg-teal-400 text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <button onClick={handleLogout} className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
