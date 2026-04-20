import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import SocialLinksPage from './pages/SocialLinksPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import CareerPage from './pages/CareerPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'social-links', element: <SocialLinksPage /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'career', element: <CareerPage /> },
      { path: 'messages', element: <MessagesPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
