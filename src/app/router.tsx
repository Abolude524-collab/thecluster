import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../components/landing/LandingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { SignupPage } from '../features/auth/SignupPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { AnalyticsPage } from '../features/analytics/AnalyticsPage';
import { ContentPage } from '../features/content/ContentPage';
import { ContentDetailPage } from '../features/content/ContentDetailPage';
import { ConnectionsPage } from '../features/connections/ConnectionsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { NotFoundPage } from '../components/layout/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'content/:id', element: <ContentDetailPage /> },
      { path: 'connections', element: <ConnectionsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
