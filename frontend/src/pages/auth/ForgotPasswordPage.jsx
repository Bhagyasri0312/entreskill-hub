import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthFormShell, { InputField } from './AuthFormShell';
import { authApi } from '../../services/api';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await authApi.forgotPassword(form);
      navigate('/reset-password', {
        replace: true,
        state: { email: form.email, token: response.resetPasswordToken ?? '' }
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Forgot Password"
      title="Request a reset code."
      description="Use your email to generate a password reset token from the backend."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--color-primary)]" to="/login">
            Back to login
          </Link>
          <Link className="text-[var(--color-primary)]" to="/signup">
            Create account
          </Link>
        </div>
      }
    >
      <AuthFormShell
        onSubmit={handleSubmit}
        actionLabel={isSubmitting ? 'Sending...' : 'Send reset code'}
        status={status}
        submitDisabled={isSubmitting}
        fields={
          <InputField
            label="Email address"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ email: event.target.value })}
            placeholder="you@example.com"
            required
          />
        }
      />
    </AuthLayout>
  );
}