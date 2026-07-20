import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ isAuthenticated, redirectTo = '/login', roles, children }) {
  const auth = useAuth();
  const location = useLocation();
  const content = children ?? <Outlet />;
  const authenticated = isAuthenticated ?? auth.isAuthenticated;
  const userRole = auth.user?.role;

  if (auth.isLoading) {
    return <Loader label="Checking session" />;
  }

  if (!authenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (roles && roles.length > 0 && (!userRole || !roles.includes(userRole))) {
    return <Navigate to="/" replace />;
  }

  return content;
}