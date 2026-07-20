import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, Container, Typography } from '../../components/ui';

export default function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f8_0%,#fffdfd_38%,#ffffff_100%)] text-[var(--color-text)]">
      <Container size="lg" className="flex min-h-screen items-center py-10 sm:py-14">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c1121f,#e63946)] font-extrabold text-white shadow-[0_12px_28px_rgba(193,18,31,0.2)]">
                EH
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  EntreSkill Hub
                </span>
                <span className="block text-lg font-extrabold tracking-tight text-[var(--color-primary)]">
                  Business growth portal
                </span>
              </span>
            </Link>

            <div className="mt-8 max-w-xl">
              <Typography variant="label" className="home-text-primary mb-3 inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
                {eyebrow}
              </Typography>
              <Typography variant="display" as="h1" className="text-balance">
                {title}
              </Typography>
              <Typography variant="body" className="mt-5 text-pretty text-[1.06rem]">
                {description}
              </Typography>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          >
            <Card elevated className="border-[rgba(193,18,31,0.08)] p-0">
              <div className="border-b border-[rgba(193,18,31,0.08)] bg-[linear-gradient(135deg,rgba(193,18,31,0.08),rgba(255,255,255,0.96))] px-6 py-5 sm:px-8">
                <Typography variant="h3" as="h2" className="text-[var(--color-text)]">
                  {title}
                </Typography>
              </div>

              <div className="px-6 py-6 sm:px-8">{children}</div>

              {footer ? <div className="border-t border-[rgba(193,18,31,0.08)] px-6 py-5 sm:px-8">{footer}</div> : null}
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}