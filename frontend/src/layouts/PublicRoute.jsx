import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const roleRedirectMap = {
  user: '/user',
  mentor: '/mentor',
  admin: '/admin'
};

export default function PublicRoute({ isAuthenticated, redirectTo, children }) {
  const auth = useAuth();
  const content = children ?? <Outlet />;
  const authenticated = isAuthenticated ?? auth.isAuthenticated;
  const target = redirectTo ?? roleRedirectMap[auth.user?.role] ?? '/';

  if (auth.isLoading) {
    return <Loader label="Checking session" />;
  }

  if (authenticated) {
    return <Navigate to={target} replace />;
  }

  return content;
}