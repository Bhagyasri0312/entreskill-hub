import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Container, Typography } from '../../components/ui';

const roles = [
  {
    role: 'user',
    title: 'User',
    description: 'Explore business ideas, resources, and mentorship as a founder or operator.'
  },
  {
    role: 'mentor',
    title: 'Mentor',
    description: 'Guide entrepreneurs with practical coaching, strategy, and support.'
  },
  {
    role: 'admin',
    title: 'Admin',
    description: 'Oversee accounts, access, and platform operations.'
  }
];

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f8_0%,#fffdfd_40%,#ffffff_100%)] py-10 text-[var(--color-text)]">
      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">
          <Typography variant="label" className="home-text-primary mb-3 inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
            Role Selection
          </Typography>
          <Typography variant="display" as="h1" className="text-balance">
            Choose the account type that matches your journey.
          </Typography>
          <Typography variant="body" className="mt-4 text-[1.05rem]">
            Pick a role to continue into the signup flow. The backend records the role and returns a JWT after verification.
          </Typography>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roles.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
                <Typography variant="h4" as="h2">
                  {item.title}
                </Typography>
                <Typography variant="body" className="home-text-muted mt-3">
                  {item.description}
                </Typography>
                <Link
                  to={`/signup?role=${item.role}`}
                  className="mt-6 inline-flex rounded-full bg-[linear-gradient(135deg,#c1121f,#e63946)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(193,18,31,0.22)] transition hover:translate-y-[-1px]"
                >
                  Continue as {item.title}
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}