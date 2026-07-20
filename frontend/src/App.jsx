import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoleSelectionPage from './pages/roles/RoleSelectionPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import OtpVerificationPage from './pages/auth/OtpVerificationPage';
import UserPage from './pages/dashboards/UserPage';
import MentorPage from './pages/dashboards/MentorPage';
import AdminPage from './pages/dashboards/AdminPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './layouts';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roles" element={<RoleSelectionPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['user']} />}>
            <Route path="/user" element={<UserPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['mentor']} />}>
            <Route path="/mentor" element={<MentorPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
