import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthFormShell, { InputField } from './AuthFormShell';
import { authApi } from '../../services/api';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: location.state?.email ?? '', token: location.state?.token ?? '', newPassword: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setForm((current) => ({ ...current, email: location.state.email }));
    }
    if (location.state?.token) {
      setForm((current) => ({ ...current, token: location.state.token }));
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await authApi.resetPassword(form);
      navigate('/login', { replace: true });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Reset Password"
      title="Create a new password."
      description="Enter the reset token from the backend and choose a new password for your account."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--color-primary)]" to="/forgot-password">
            Request another token
          </Link>
          <Link className="text-[var(--color-primary)]" to="/login">
            Back to login
          </Link>
        </div>
      }
    >
      <AuthFormShell
        onSubmit={handleSubmit}
        actionLabel={isSubmitting ? 'Updating...' : 'Reset password'}
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
              label="Reset token"
              value={form.token}
              onChange={(event) => setForm({ ...form, token: event.target.value })}
              placeholder="6-digit token"
              required
            />
            <InputField
              label="New password"
              type="password"
              value={form.newPassword}
              onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
              placeholder="Enter a new password"
              required
            />
          </>
        }
      />
    </AuthLayout>
  );
}