import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Container, InputField, Typography } from '../components/ui';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay }
  })
};

const MotionLink = motion(Link);

const authLinkMotion = {
  whileHover: { y: -1, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.18, ease: 'easeOut' }
};

const navLinks = [
  { label: 'Categories', href: '#business-categories' },
  { label: 'Skills', href: '#popular-skills' },
  { label: 'Ideas', href: '#featured-ideas' },
  { label: 'Mentors', href: '#featured-mentors' },
  { label: 'Resources', href: '#learning-resources' },
  { label: 'FAQ', href: '#faq' }
];

const categories = [
  { title: 'Funding & Grants', text: 'Explore capital, microloans, and grant-ready opportunities.' },
  { title: 'Business Planning', text: 'Turn an idea into a clear, organized operating plan.' },
  { title: 'Marketing & Sales', text: 'Build visibility, convert leads, and create repeat demand.' },
  { title: 'Operations', text: 'Set up systems for staffing, fulfillment, and service delivery.' },
  { title: 'Digital Commerce', text: 'Launch storefronts, subscriptions, and product-led growth.' },
  { title: 'Professional Services', text: 'Package expertise into scalable offers and retainers.' }
];

const skills = [
  'Cash flow forecasting',
  'Go-to-market planning',
  'Pitch deck design',
  'Customer discovery',
  'Local SEO',
  'Sales funnels',
  'Pricing strategy',
  'Operations playbooks'
];

const ideas = [
  {
    title: 'Neighborhood meal prep subscription',
    fit: 'Low overhead, recurring revenue, local demand',
    level: 'Launch in 30 days'
  },
  {
    title: 'Mobile admin support studio',
    fit: 'Solo-friendly, high margin, remote delivery',
    level: 'Launch in 21 days'
  },
  {
    title: 'Specialty retail pop-up collective',
    fit: 'Community-first, event-driven, brand-building',
    level: 'Launch in 45 days'
  }
];

const mentors = [
  {
    name: 'Alicia Grant',
    role: 'Funding strategist',
    bio: 'Helps founders organize loan packages, grants, and investor-ready narratives.',
    expertise: 'Capital readiness'
  },
  {
    name: 'Marcus Lee',
    role: 'Operations advisor',
    bio: 'Designs lean systems that keep small teams efficient and customer focused.',
    expertise: 'Systems design'
  },
  {
    name: 'Priya Shah',
    role: 'Growth mentor',
    bio: 'Guides early-stage businesses through positioning, offers, and acquisition.',
    expertise: 'Growth strategy'
  }
];

const resources = [
  { type: 'Guide', title: 'Startup readiness checklist', meta: '12 min read' },
  { type: 'Toolkit', title: 'Revenue model worksheet', meta: '8 templates' },
  { type: 'Webinar', title: 'How to validate demand fast', meta: '38 min watch' },
  { type: 'Template', title: 'Loan application prep pack', meta: 'Downloadable' }
];

const stories = [
  {
    quote: 'The roadmap helped me go from hobby sales to a structured business with repeat customers.',
    name: 'Jordan M.',
    outcome: 'Expanded into two new neighborhoods'
  },
  {
    quote: 'I finally had a clear story for lenders, and that changed how confidently I pitched.',
    name: 'Tasha R.',
    outcome: 'Secured early working capital'
  },
  {
    quote: 'The mentoring framework made it easy to prioritize the few actions that actually moved revenue.',
    name: 'Devon K.',
    outcome: 'Launched a service business in 6 weeks'
  }
];

const stats = [
  { value: '18K+', label: 'Entrepreneurs supported' },
  { value: '92%', label: 'Plan completion rate' },
  { value: '4.8/5', label: 'Average mentor rating' },
  { value: '1,200+', label: 'Learning resources accessed' }
];

const faqs = [
  {
    question: 'Is this platform focused on one type of business?',
    answer:
      'No. It is designed for a broad range of small business owners, from solo service providers to local retail and digital-first founders.'
  },
  {
    question: 'Do I need prior business experience?',
    answer:
      'No prior experience is required. The content is structured to help new founders, side hustlers, and growing owners move step by step.'
  },
  {
    question: 'Can I use it to prepare for funding conversations?',
    answer:
      'Yes. The learning resources and mentor guidance are designed to help you organize your idea, finances, and growth story.'
  },
  {
    question: 'Does this page submit data anywhere?',
    answer:
      'No. This home page is frontend-only and uses static interactions plus animations. No backend functionality is included.'
  }
];

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Typography variant="label" className="home-text-primary mb-3 inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.2em]">
        {eyebrow}
      </Typography>
      <Typography variant="h2" as="h2" className="text-balance">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body" className="mt-4 text-pretty text-[1.05rem]">
          {description}
        </Typography>
      ) : null}
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <Card elevated className="border-[rgba(193,18,31,0.08)] bg-white/95 p-5">
      <Typography as="p" variant="h3" className="home-text-primary">
        {value}
      </Typography>
      <Typography as="p" variant="caption" className="home-text-muted mt-2">
        {label}
      </Typography>
    </Card>
  );
}

function FaqItem({ question, answer, open, onToggle }) {
  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[rgba(193,18,31,0.04)]"
      >
        <Typography as="h3" variant="h4">
          {question}
        </Typography>
        <span
          className={`home-text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(193,18,31,0.15)] text-xl font-semibold transition ${
            open ? 'rotate-45 bg-[rgba(193,18,31,0.08)]' : 'bg-white'
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <Typography variant="body" className="home-text-muted">
                {answer}
              </Typography>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const trustItems = useMemo(
    () => ['Small business focus', 'Mentor-led insights', 'Funding-ready guidance'],
    []
  );

  return (
    <div className="home-page min-h-screen bg-[linear-gradient(180deg,#fff8f8_0%,#fffdfd_40%,#ffffff_100%)]">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 border-b border-[rgba(193,18,31,0.1)] bg-[rgba(255,248,248,0.88)] backdrop-blur-xl"
      >
        <Container size="xl" className="py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c1121f_0%,#e63946_100%)] text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(193,18,31,0.22)]">
                EH
              </span>
              <div>
                <p className="m-0 text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(26,26,26,0.58)]">
                  Entrepreneur Hub
                </p>
                <p className="home-text-primary m-0 text-lg font-extrabold tracking-tight">
                  EntreSkill Hub
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="home-text-muted home-hover-text-primary text-sm font-medium transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <MotionLink
                to="/login"
                {...authLinkMotion}
                className="home-text-primary inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-[rgba(193,18,31,0.06)]"
              >
                Login
              </MotionLink>

              <MotionLink
                to="/register"
                {...authLinkMotion}
                className="home-text-primary inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(193,18,31,0.18)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[rgba(193,18,31,0.3)] hover:bg-[rgba(193,18,31,0.04)]"
              >
                Register
              </MotionLink>

              <Button as="a" href="#newsletter" variant="secondary" size="sm">
                Join newsletter
              </Button>
              <Button as="a" href="#featured-ideas" size="sm">
                Explore ideas
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="home-text-primary inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(193,18,31,0.12)] bg-white shadow-sm lg:hidden"
              aria-label="Toggle navigation"
            >
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 rounded-3xl border border-[rgba(193,18,31,0.1)] bg-white p-4 shadow-[0_16px_40px_rgba(193,18,31,0.08)]">
                  <div className="grid gap-3">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="home-hover-text-primary rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[rgba(193,18,31,0.06)]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <MotionLink
                      to="/login"
                      {...authLinkMotion}
                      onClick={() => setMobileMenuOpen(false)}
                      className="home-text-primary inline-flex w-full min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-[rgba(193,18,31,0.06)]"
                    >
                      Login
                    </MotionLink>

                    <MotionLink
                      to="/register"
                      {...authLinkMotion}
                      onClick={() => setMobileMenuOpen(false)}
                      className="home-text-primary inline-flex w-full min-h-11 items-center justify-center rounded-full border border-[rgba(193,18,31,0.18)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[rgba(193,18,31,0.3)] hover:bg-[rgba(193,18,31,0.04)]"
                    >
                      Register
                    </MotionLink>

                    <Button as="a" href="#newsletter" variant="secondary" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      Join newsletter
                    </Button>
                    <Button as="a" href="#featured-ideas" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      Explore ideas
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Container>
      </motion.header>

      <main id="top">
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,107,107,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(230,57,70,0.12),transparent_26%),linear-gradient(180deg,rgba(255,248,248,0.6),transparent_55%)]" />

          <Container size="xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <Typography variant="label" className="home-text-primary mb-5 inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
                  For founders, makers, and small business operators
                </Typography>

                <Typography variant="display" as="h1" className="text-balance">
                  Build a stronger business with red-hot clarity.
                </Typography>

                <Typography variant="body" className="mt-6 max-w-xl text-pretty text-[1.08rem]">
                  A modern, SBA-inspired experience for entrepreneurs who want practical guidance on funding, skills,
                  mentors, and growth. Everything here is designed to help you move from idea to execution with confidence.
                </Typography>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button as="a" href="#featured-ideas" size="lg">
                    Discover opportunities
                  </Button>
                  <Button as="a" href="#learning-resources" variant="secondary" size="lg">
                    Browse learning resources
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="home-text-muted rounded-full border border-[rgba(193,18,31,0.12)] bg-white px-4 py-2 text-sm font-medium shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-[rgba(230,57,70,0.16)] blur-2xl" />
                <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-[rgba(193,18,31,0.14)] blur-2xl" />

                <Card elevated className="relative overflow-hidden border-[rgba(193,18,31,0.1)] p-0">
                  <div className="bg-[linear-gradient(135deg,#c1121f_0%,#e63946_55%,#ff6b6b_100%)] p-6 text-white sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="m-0 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                          Business readiness
                        </p>
                        <p className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                          Your next step, organized.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/15 px-4 py-3 text-right backdrop-blur-sm">
                        <p className="m-0 text-xs uppercase tracking-[0.2em] text-white/75">Focus score</p>
                        <p className="m-0 text-2xl font-extrabold">87%</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        'Funding plan',
                        'Market fit',
                        'Launch checklist'
                      ].map((item) => (
                        <div key={item} className="rounded-2xl bg-white/14 p-4">
                          <p className="m-0 text-sm font-semibold text-white/90">{item}</p>
                          <p className="m-0 mt-2 text-sm text-white/72">Prepared and ready to refine</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                    {[
                      ['12', 'Focused learning tracks'],
                      ['48h', 'Average mentor response goal'],
                      ['20+', 'Business categories covered'],
                      ['100%', 'Frontend-only presentation']
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(180deg,rgba(255,248,248,0.8),#fff)] p-4"
                      >
                        <p className="home-text-primary m-0 text-2xl font-extrabold">{value}</p>
                        <p className="home-text-muted m-0 mt-1 text-sm">{label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>

        <motion.section
          id="business-categories"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow="Business Categories"
              title="Explore focused paths for every stage of business growth."
              description="Choose the lane that matches your current goals and build from a structure that feels practical, modern, and easy to navigate."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  custom={index * 0.05}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <Card elevated className="h-full border-[rgba(193,18,31,0.08)] hover:shadow-[0_18px_40px_rgba(193,18,31,0.11)]">
                    <Typography variant="h4" as="h3">
                      {category.title}
                    </Typography>
                    <Typography variant="body" className="home-text-muted mt-3">
                      {category.text}
                    </Typography>
                    <div className="home-text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Learn more <span aria-hidden="true">→</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="popular-skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <div className="grid gap-8 rounded-4xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(135deg,rgba(193,18,31,0.05),rgba(255,255,255,0.92))] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Popular Skills"
                title="Build the skills that move a business forward."
                description="Use these high-demand capabilities to sharpen your offer, improve operations, and tell a stronger growth story."
              />

              <div className="flex flex-wrap gap-3 self-center">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    custom={index * 0.04}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="home-text-base rounded-full border border-[rgba(193,18,31,0.12)] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="featured-ideas"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow="Featured Business Ideas"
              title="Browse ideas built for practical execution and sustainable growth."
              description="Every concept below is framed through feasibility, speed to launch, and the kind of discipline small businesses need to scale."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {ideas.map((idea, index) => (
                <motion.div
                  key={idea.title}
                  custom={index * 0.07}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
                    <div className="flex items-center justify-between gap-3">
                      <Typography variant="label" className="home-text-primary rounded-full bg-[rgba(230,57,70,0.08)] px-3 py-1 text-[11px] font-bold">
                        Idea {index + 1}
                      </Typography>
                      <span className="home-text-secondary text-sm font-semibold">{idea.level}</span>
                    </div>

                    <Typography variant="h3" as="h3" className="mt-4">
                      {idea.title}
                    </Typography>
                    <Typography variant="body" className="home-text-muted mt-3">
                      {idea.fit}
                    </Typography>

                    <div className="home-text-muted mt-5 flex items-center justify-between border-t border-[rgba(193,18,31,0.08)] pt-4 text-sm">
                      <span>Launch-ready concept</span>
                      <span className="home-text-primary font-semibold">View details</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="featured-mentors"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow="Featured Mentors"
              title="Meet mentors who help small businesses get sharper, faster."
              description="This is a coaching-style discovery area for thoughtful feedback, practical next steps, and direction that fits the realities of small business ownership."
            />

            <div className="mt-10 grid gap-5 xl:grid-cols-3">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.name}
                  custom={index * 0.08}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c1121f,#e63946)] text-lg font-extrabold text-white shadow-[0_12px_28px_rgba(193,18,31,0.2)]">
                        {mentor.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')}
                      </div>
                      <div>
                        <Typography variant="h4" as="h3">
                          {mentor.name}
                        </Typography>
                        <Typography variant="caption" className="home-text-muted mt-1">
                          {mentor.role}
                        </Typography>
                      </div>
                    </div>

                    <Typography variant="body" className="home-text-muted mt-4">
                      {mentor.bio}
                    </Typography>

                    <div className="home-text-primary mt-5 inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                      {mentor.expertise}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="learning-resources"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <SectionHeading
                eyebrow="Learning Resources"
                title="Short, practical resources for every stage of the journey."
                description="Whether you are validating an idea or refining an existing business, these resources are structured to help you act quickly and confidently."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    custom={index * 0.05}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
                      <Typography variant="label" className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-[11px] font-bold">
                        {resource.type}
                      </Typography>
                      <Typography variant="h4" as="h3" className="mt-4">
                        {resource.title}
                      </Typography>
                      <Typography variant="caption" className="home-text-muted mt-3">
                        {resource.meta}
                      </Typography>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="success-stories"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow="Success Stories"
              title="See how structured guidance can change momentum."
              description="These stories reflect the kind of practical wins business owners care about: better organization, clearer offers, and stronger readiness to grow."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {stories.map((story, index) => (
                <motion.div
                  key={story.name}
                  custom={index * 0.07}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
                    <div className="mb-4 text-5xl leading-none text-[rgba(230,57,70,0.22)]">“</div>
                    <Typography variant="body">
                      {story.quote}
                    </Typography>
                    <div className="mt-6 border-t border-[rgba(193,18,31,0.08)] pt-4">
                      <p className="home-text-primary m-0 font-semibold">{story.name}</p>
                      <p className="home-text-muted m-0 mt-1 text-sm">{story.outcome}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="statistics"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <div className="rounded-4xl bg-[linear-gradient(135deg,#fff,#fff5f5)] p-6 sm:p-8">
              <SectionHeading
                eyebrow="Statistics"
                title="Signals that show the platform is built around real business progress."
                description="These numbers are presented in a confident, SBA-inspired style while remaining entirely original in visual treatment and layout."
              />

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    custom={index * 0.05}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <StatPill {...stat} />
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="faq"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-14"
        >
          <Container size="xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Quick answers for common questions."
              description="A simple expandable FAQ keeps the page approachable on both desktop and mobile."
            />

            <div className="mt-10 grid gap-4 lg:max-w-3xl">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  {...faq}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </Container>
        </motion.section>

        <motion.section
          id="newsletter"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-10 sm:py-16"
        >
          <Container size="xl">
            <div className="grid gap-8 rounded-4xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(135deg,rgba(193,18,31,0.08),rgba(255,255,255,0.96))] p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <Typography variant="label" className="home-text-primary mb-3 inline-flex rounded-full bg-white px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                  Newsletter
                </Typography>
                <Typography variant="h2" as="h2">
                  Get practical business ideas and red-hot insights in your inbox.
                </Typography>
                <Typography variant="body" className="home-text-muted mt-4">
                  No spam, no backend submission, just a polished call-to-action block for future growth.
                </Typography>
              </div>

              <Card elevated className="border-[rgba(193,18,31,0.08)] bg-white/95">
                <form onSubmit={(event) => event.preventDefault()} className="grid gap-4">
                  <InputField label="Email address" type="email" placeholder="you@example.com" helperText="Get occasional updates and new resources." />
                  <Button type="submit" size="lg" className="w-full">
                    Subscribe now
                  </Button>
                </form>
              </Card>
            </div>
          </Container>
        </motion.section>
      </main>

      <footer className="border-t border-[rgba(193,18,31,0.08)] bg-white/80 py-8">
        <Container size="xl">
          <div className="home-text-muted flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="home-text-base m-0 font-semibold">EntreSkill Hub</p>
              <p className="m-0 mt-1">Inspired by SBA-level clarity, built with an original red identity.</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {navLinks.slice(0, 4).map((link) => (
                <a key={link.label} href={link.href} className="home-hover-text-primary transition">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}