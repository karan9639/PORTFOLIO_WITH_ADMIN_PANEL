import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogin } from '../hooks/useAuth.js';

const schema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'Admin@123456',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to login');
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="admin-card w-full max-w-lg p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-400/15 text-xl font-semibold text-teal-200">KS</div>
          <h1 className="mt-6 text-3xl font-semibold text-white">Portfolio Admin</h1>
          <p className="mt-3 text-sm text-slate-400">Manage portfolio content, messages, and all public-facing sections from one place.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="admin-label">Email</label>
            <input {...form.register('email')} className="admin-input" placeholder="admin@example.com" />
            {form.formState.errors.email ? <p className="mt-2 text-sm text-rose-300">{form.formState.errors.email.message}</p> : null}
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input type="password" {...form.register('password')} className="admin-input" placeholder="••••••••" />
            {form.formState.errors.password ? <p className="mt-2 text-sm text-rose-300">{form.formState.errors.password.message}</p> : null}
          </div>
          <button disabled={login.isPending} className="w-full rounded-2xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-70">
            {login.isPending ? 'Signing in…' : 'Login to admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
