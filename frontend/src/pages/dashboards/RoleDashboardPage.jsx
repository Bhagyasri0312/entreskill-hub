import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Typography } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

const roleContent = {
  user: {
    title: 'User Dashboard',
    description: 'Track business ideas, learning progress, and growth resources.'
  },
  mentor: {
    title: 'Mentor Dashboard',
    description: 'Review founders, coaching opportunities, and support actions.'
  },
  admin: {
    title: 'Admin Dashboard',
    description: 'Manage platform access, content, and account oversight.'
  }
};

export default function RoleDashboardPage({ role }) {
  const { user, logout } = useAuth();
  const content = roleContent[role];

  const summary = useMemo(
    () => [
      { label: 'Signed in as', value: user?.name ?? 'Account holder' },
      { label: 'Email', value: user?.email ?? 'unknown' },
      { label: 'Role', value: user?.role ?? role }
    ],
    [role, user]
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f8_0%,#fffdfd_40%,#ffffff_100%)] py-10 text-[var(--color-text)]">
      <Container size="lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography variant="label" className="home-text-primary inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
              {content.title}
            </Typography>
            <Typography variant="h2" as="h1" className="mt-4">
              {content.title}
            </Typography>
            <Typography variant="body" className="mt-3 text-[1.05rem]">
              {content.description}
            </Typography>
          </div>

          <Button onClick={logout} variant="secondary">
            Sign out
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {summary.map((item) => (
            <Card key={item.label} elevated className="border-[rgba(193,18,31,0.08)]">
              <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                {item.label}
              </Typography>
              <Typography variant="h4" as="h2" className="mt-3">
                {item.value}
              </Typography>
            </Card>
          ))}
        </div>

        <Card elevated className="mt-8 border-[rgba(193,18,31,0.08)]">
          <Typography variant="h4" as="h2">
            Quick links
          </Typography>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]" to="/">
              Home
            </Link>
            <Link className="rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]" to="/login">
              Login
            </Link>
            <Link className="rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]" to="/roles">
              Role selection
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}