import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthFormShell, { InputField } from './AuthFormShell';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const initialRole = useMemo(
    () => searchParams.get('role') ?? location.state?.role ?? 'user',
    [location.state?.role, searchParams]
  );

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: initialRole });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await authApi.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });

      setUser(response.user);
      navigate('/verify-otp', { replace: true, state: { email: form.email, otpCode: response.otpCode, role: form.role } });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Signup"
      title="Create your account."
      description="Set up your business profile, select a role, and continue through OTP verification."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--color-primary)]" to="/roles">
            Change role
          </Link>
          <Link className="text-[var(--color-primary)]" to="/login">
            Already have an account?
          </Link>
        </div>
      }
    >
      <AuthFormShell
        onSubmit={handleSubmit}
        actionLabel={isSubmitting ? 'Creating account...' : 'Create account'}
        status={status}
        submitDisabled={isSubmitting}
        fields={
          <>
            <InputField
              label="Full name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
              required
            />
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
              placeholder="Create a secure password"
              required
            />
            <InputField
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
              placeholder="Repeat your password"
              required
            />
            <InputField
              label="Role"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              placeholder="user, mentor, or admin"
              helperText="Selected role is saved to the account and used for routing after login."
            />
          </>
        }
      />
    </AuthLayout>
  );
}