import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthFormShell, { InputField } from './AuthFormShell';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';

const roleRedirectMap = {
  user: '/user',
  mentor: '/mentor',
  admin: '/admin'
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await authApi.login(form);
      setUser(response.user);
      navigate(roleRedirectMap[response.user.role] ?? '/', { replace: true });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Login"
      title="Welcome back."
      description="Sign in to access your role-based dashboard, saved progress, and account tools."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--color-primary)]" to="/signup">
            Need an account?
          </Link>
          <Link className="text-[var(--color-primary)]" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
      }
    >
      <AuthFormShell
        onSubmit={handleSubmit}
        actionLabel={isSubmitting ? 'Signing in...' : 'Sign in'}
        status={status}
        submitDisabled={isSubmitting}
        fields={
          <>
            <InputField
              label="Email address"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              required
            />
            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Enter your password"
              required
            />
            <InputField
              label="Role (optional)"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              placeholder="user, mentor, or admin"
              helperText="Use this to confirm the role you want to access."
            />
          </>
        }
      />
    </AuthLayout>
  );
}