import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-300">Checking session…</div>;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
