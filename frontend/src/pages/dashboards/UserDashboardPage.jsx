import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Container, InputField, Typography } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

const navigationItems = [
  { label: 'Profile', href: '#profile' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Saved Ideas', href: '#saved-ideas' },
  { label: 'Bookmarks', href: '#bookmarks' },
  { label: 'Learning', href: '#learning-progress' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Mentor Sessions', href: '#mentor-sessions' },
  { label: 'Notifications', href: '#notifications' }
];

const businesses = [
  {
    name: 'Neighborhood Meal Prep',
    category: 'Food & Beverage',
    budget: 'low',
    location: 'local',
    experience: 'beginner',
    language: ['English', 'Spanish'],
    goals: ['recurring', 'community'],
    skills: ['sales', 'operations', 'cooking'],
    description: 'A recurring service for busy professionals who want healthy meals on a schedule.',
    score: 92,
    tags: ['Recurring revenue', 'Local demand', 'Low startup cost']
  },
  {
    name: 'Mobile Admin Studio',
    category: 'Professional Services',
    budget: 'low',
    location: 'remote',
    experience: 'beginner',
    language: ['English'],
    goals: ['freedom', 'growth'],
    skills: ['operations', 'communication', 'pricing'],
    description: 'A lean service business that helps small teams stay organized and productive.',
    score: 89,
    tags: ['Solo-friendly', 'Remote delivery', 'High margin']
  },
  {
    name: 'Redline Retail Pop-Up',
    category: 'Retail',
    budget: 'medium',
    location: 'local',
    experience: 'intermediate',
    language: ['English'],
    goals: ['brand', 'community'],
    skills: ['branding', 'marketing', 'sales'],
    description: 'A flexible event-driven retail concept with strong visibility and neighborhood appeal.',
    score: 84,
    tags: ['Brand building', 'Event-led', 'Community reach']
  },
  {
    name: 'Digital Learning Lab',
    category: 'Digital Services',
    budget: 'low',
    location: 'remote',
    experience: 'advanced',
    language: ['English', 'French'],
    goals: ['scale', 'knowledge'],
    skills: ['content', 'teaching', 'technology'],
    description: 'Create digital products and training offers for a broader audience.',
    score: 86,
    tags: ['Digital product', 'Scalable', 'Knowledge business']
  },
  {
    name: 'Senior Support Concierge',
    category: 'Care Services',
    budget: 'low',
    location: 'local',
    experience: 'beginner',
    language: ['English', 'Spanish'],
    goals: ['community', 'impact'],
    skills: ['communication', 'empathy', 'organization'],
    description: 'A service business supporting older adults with admin help and light coordination.',
    score: 90,
    tags: ['Community impact', 'Trust-based', 'Service-led']
  },
  {
    name: 'Online Brand Support',
    category: 'Marketing',
    budget: 'low',
    location: 'remote',
    experience: 'intermediate',
    language: ['English'],
    goals: ['growth', 'freedom'],
    skills: ['design', 'marketing', 'communication'],
    description: 'A flexible consulting and content studio for small businesses that need visibility.',
    score: 87,
    tags: ['Service business', 'Remote first', 'Fast start']
  }
];

const assessments = {
  skills: ['marketing', 'sales', 'operations', 'branding', 'content', 'communication', 'technology', 'teaching'],
  interests: ['food', 'retail', 'digital services', 'community', 'impact', 'freedom', 'growth', 'knowledge'],
  budgets: ['low', 'medium', 'high'],
  locations: ['local', 'remote'],
  experiences: ['beginner', 'intermediate', 'advanced'],
  languages: ['English', 'Spanish', 'French'],
  goals: ['recurring', 'community', 'brand', 'scale', 'freedom', 'knowledge', 'impact', 'growth']
};

const chartData = [78, 66, 91, 72, 84];

const defaultForm = {
  skills: 'marketing, sales, communication',
  interests: 'community, growth, freedom',
  budget: 'low',
  location: 'remote',
  experience: 'beginner',
  language: 'English',
  goal: 'growth',
  category: 'all',
  search: ''
};

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <Typography variant="label" className="home-text-primary inline-flex rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
        {eyebrow}
      </Typography>
      <Typography variant="h2" as="h2" className="mt-4">
        {title}
      </Typography>
      <Typography variant="body" className="mt-4 text-[1.04rem]">
        {description}
      </Typography>
    </div>
  );
}

function StatCard({ label, value, delta }) {
  return (
    <Card elevated className="border-[rgba(193,18,31,0.08)]">
      <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
        {label}
      </Typography>
      <div className="mt-3 flex items-end justify-between gap-4">
        <Typography variant="h3" as="p" className="home-text-primary">
          {value}
        </Typography>
        <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold">
          {delta}
        </span>
      </div>
    </Card>
  );
}

function BarChart({ values }) {
  const maxValue = Math.max(...values);

  return (
    <Card elevated className="border-[rgba(193,18,31,0.08)] p-0">
      <div className="border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
        <Typography variant="h4" as="h3">
          Recommendation fit
        </Typography>
      </div>
      <div className="flex items-end gap-3 px-5 py-6">
        {values.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-56 w-full items-end rounded-2xl bg-[linear-gradient(180deg,rgba(255,248,248,0.5),#fff)] p-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
                className="w-full rounded-2xl bg-[linear-gradient(180deg,#ff6b6b_0%,#e63946_42%,#c1121f_100%)] shadow-[0_10px_24px_rgba(193,18,31,0.18)]"
              />
            </div>
            <span className="home-text-muted text-xs font-semibold">{index + 1}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecommendationCard({ business }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card elevated className="h-full border-[rgba(193,18,31,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography variant="h4" as="h3">
              {business.name}
            </Typography>
            <Typography variant="caption" className="home-text-muted mt-1 uppercase tracking-[0.18em]">
              {business.category}
            </Typography>
          </div>

          <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-sm font-semibold">
            {business.score}% fit
          </span>
        </div>

        <Typography variant="body" className="home-text-muted mt-4">
          {business.description}
        </Typography>

        <div className="mt-5 flex flex-wrap gap-2">
          {business.tags.map((tag) => (
            <span key={tag} className="home-text-primary rounded-full border border-[rgba(193,18,31,0.08)] bg-white px-3 py-1 text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </motion.article>
  );
}

export default function UserDashboardPage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState(defaultForm);

  const parsedSkills = useMemo(
    () => form.skills.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean),
    [form.skills]
  );

  const parsedInterests = useMemo(
    () => form.interests.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean),
    [form.interests]
  );

  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((business) => (form.category === 'all' ? true : business.category.toLowerCase() === form.category))
      .filter((business) => business.budget === form.budget)
      .filter((business) => business.location === form.location)
      .filter((business) => business.experience === form.experience)
      .filter((business) => business.language.includes(form.language))
      .filter((business) => business.goals.includes(form.goal) || business.tags.some((tag) => tag.toLowerCase().includes(form.goal)))
      .filter((business) =>
        form.search
          ? [business.name, business.category, business.description, ...business.tags].join(' ').toLowerCase().includes(form.search.toLowerCase())
          : true
      )
      .map((business) => {
        const skillMatches = parsedSkills.filter((skill) => business.skills.includes(skill)).length;
        const interestMatches = parsedInterests.filter((interest) => business.description.toLowerCase().includes(interest) || business.tags.some((tag) => tag.toLowerCase().includes(interest))).length;
        const score = Math.min(100, business.score + skillMatches * 5 + interestMatches * 4);
        return { ...business, score };
      })
      .sort((left, right) => right.score - left.score);
  }, [form, parsedInterests, parsedSkills]);

  const profileStats = [
    { label: 'Saved Ideas', value: '12', delta: '+3 this week' },
    { label: 'Bookmarks', value: '27', delta: '+6 this month' },
    { label: 'Mentor Sessions', value: '4', delta: '2 upcoming' },
    { label: 'Certificates', value: '3', delta: '1 in progress' }
  ];

  const notifications = [
    'Your mentor session is confirmed for Thursday at 3 PM.',
    'New business idea matches your budget and location preferences.',
    'Learning progress reached 72% this month.',
    'A saved idea was bookmarked by your network.'
  ];

  const savedIdeas = [
    'Mobile admin studio',
    'Community meal prep service',
    'Digital product workshop'
  ];

  const bookmarks = [
    'Funding checklist',
    'Pricing template',
    'Local market analysis'
  ];

  const learningProgress = [
    { label: 'Business plan', value: 82 },
    { label: 'Marketing', value: 74 },
    { label: 'Finance', value: 64 },
    { label: 'Operations', value: 88 }
  ];

  const certificates = [
    'Startup Foundations',
    'Customer Discovery',
    'Revenue Planning'
  ];

  const mentorSessions = [
    { date: 'Tue, 10:30 AM', topic: 'Pitch refinement' },
    { date: 'Thu, 3:00 PM', topic: 'Pricing review' }
  ];

  return (
    <div className="home-page min-h-screen bg-[linear-gradient(180deg,#fff8f8_0%,#fffdfd_40%,#ffffff_100%)]">
      <Container size="xl" className="py-6 sm:py-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
            <Card elevated className="h-full border-[rgba(193,18,31,0.08)] p-0">
              <div className="border-b border-[rgba(193,18,31,0.08)] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c1121f,#e63946)] font-extrabold text-white shadow-[0_12px_28px_rgba(193,18,31,0.2)]">
                    {user?.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
                  </div>
                  <div>
                    <Typography variant="h4" as="h2">
                      {user?.name ?? 'User'}
                    </Typography>
                    <Typography variant="caption" className="home-text-muted mt-1">
                      {user?.email ?? 'user@example.com'}
                    </Typography>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <ul className="grid gap-2">
                  {navigationItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="home-text-base home-hover-text-primary block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[rgba(193,18,31,0.08)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[rgba(193,18,31,0.08)] p-4">
                <Button onClick={logout} variant="secondary" className="w-full">
                  Sign out
                </Button>
              </div>
            </Card>
          </aside>

          <main className="grid gap-6">
            <section id="profile" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle
                  eyebrow="Profile"
                  title="Your dashboard at a glance"
                  description="Track your business journey, activity, and next best steps from one responsive workspace."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {profileStats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                  ))}
                </div>
              </Card>

              <BarChart values={chartData} />
            </section>

            <section id="assessment" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle
                  eyebrow="Skill Assessment"
                  title="Tell us a little about your business direction"
                  description="We use your skills, interests, budget, location, experience, language, and goal to recommend suitable businesses."
                />

                <form className="mt-6 grid gap-4">
                  <InputField
                    label="Skills"
                    value={form.skills}
                    onChange={(event) => setForm({ ...form, skills: event.target.value })}
                    placeholder="marketing, sales, operations"
                    helperText={`Available: ${assessments.skills.join(', ')}`}
                  />
                  <InputField
                    label="Interests"
                    value={form.interests}
                    onChange={(event) => setForm({ ...form, interests: event.target.value })}
                    placeholder="community, growth, freedom"
                    helperText={`Available: ${assessments.interests.join(', ')}`}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Budget"
                      value={form.budget}
                      onChange={(event) => setForm({ ...form, budget: event.target.value })}
                      placeholder="low, medium, high"
                    />
                    <InputField
                      label="Location"
                      value={form.location}
                      onChange={(event) => setForm({ ...form, location: event.target.value })}
                      placeholder="local or remote"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Experience"
                      value={form.experience}
                      onChange={(event) => setForm({ ...form, experience: event.target.value })}
                      placeholder="beginner, intermediate, advanced"
                    />
                    <InputField
                      label="Language"
                      value={form.language}
                      onChange={(event) => setForm({ ...form, language: event.target.value })}
                      placeholder="English, Spanish, French"
                    />
                  </div>

                  <InputField
                    label="Business Goal"
                    value={form.goal}
                    onChange={(event) => setForm({ ...form, goal: event.target.value })}
                    placeholder="recurring, community, scale, freedom"
                    helperText={`Examples: ${assessments.goals.join(', ')}`}
                  />
                </form>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle
                  eyebrow="Filters"
                  title="Focus the recommendations"
                  description="Use the dashboard filters to narrow the business ideas to what fits best."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Search"
                    value={form.search}
                    onChange={(event) => setForm({ ...form, search: event.target.value })}
                    placeholder="Search ideas"
                  />
                  <InputField
                    label="Category"
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                    placeholder="all, food, retail, digital services"
                  />
                </div>

                <div className="mt-6 rounded-3xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(135deg,rgba(193,18,31,0.05),rgba(255,255,255,0.95))] p-4">
                  <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                    Current assessment inputs
                  </Typography>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[form.budget, form.location, form.experience, form.language, form.goal].map((item) => (
                      <span key={item} className="home-text-primary rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            <section id="recommendations">
              <SectionTitle
                eyebrow="Recommended Businesses"
                title="Suitable businesses based on your assessment"
                description="Cards are ranked by fit and can be filtered as you refine your profile."
              />

              <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {filteredBusinesses.map((business) => (
                  <RecommendationCard key={business.name} business={business} />
                ))}
              </div>
            </section>

            <section id="saved-ideas" className="grid gap-6 xl:grid-cols-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Saved Ideas" title="Ideas you are tracking" description="A simple saved list that stays easy to scan on mobile and desktop." />
                <div className="mt-6 grid gap-3">
                  {savedIdeas.map((idea) => (
                    <div key={idea} className="flex items-center justify-between rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3">
                      <span className="font-medium">{idea}</span>
                      <span className="home-text-primary text-sm font-semibold">Saved</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Bookmarks" title="Pinned resources and tools" description="Quick access to the resources you revisit the most." />
                <div className="mt-6 grid gap-3">
                  {bookmarks.map((bookmark) => (
                    <div key={bookmark} className="flex items-center justify-between rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3">
                      <span className="font-medium">{bookmark}</span>
                      <span className="home-text-primary text-sm font-semibold">Open</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="learning-progress" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Learning Progress" title="Progress toward your business skills" description="A simple visual progress list for the current learning track." />
                <div className="mt-6 grid gap-4">
                  {learningProgress.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm font-medium">
                        <span>{item.label}</span>
                        <span className="home-text-primary">{item.value}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[rgba(193,18,31,0.08)]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#ff6b6b,#e63946,#c1121f)]"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Charts" title="Assessment mix and activity balance" description="A compact chart block that stays readable and responsive without external chart libraries." />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                    <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                      Skill match
                    </Typography>
                    <svg viewBox="0 0 120 120" className="mx-auto mt-4 h-40 w-40">
                      <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(193,18,31,0.08)" strokeWidth="14" />
                      <circle cx="60" cy="60" r="44" fill="none" stroke="#c1121f" strokeWidth="14" strokeDasharray="276" strokeDashoffset="48" strokeLinecap="round" transform="rotate(-90 60 60)" />
                      <text x="60" y="64" textAnchor="middle" className="home-fill-primary text-xl font-extrabold">82%</text>
                    </svg>
                  </div>

                  <div className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                    <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                      Activity split
                    </Typography>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: 'Learning', value: '46%' },
                        { label: 'Mentoring', value: '28%' },
                        { label: 'Saving', value: '26%' }
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between text-sm font-medium">
                            <span>{item.label}</span>
                            <span>{item.value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[rgba(193,18,31,0.08)]">
                            <div className="h-full rounded-full bg-[linear-gradient(90deg,#ff6b6b,#e63946,#c1121f)]" style={{ width: item.value }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section id="certificates" className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Certificates" title="Completed milestones" description="Certificates help mark progress and keep the dashboard outcome-oriented." />
                <div className="mt-6 flex flex-wrap gap-3">
                  {certificates.map((certificate) => (
                    <span key={certificate} className="home-text-primary rounded-full border border-[rgba(193,18,31,0.08)] bg-white px-4 py-2 text-sm font-semibold shadow-sm">
                      {certificate}
                    </span>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Mentor Sessions" title="Upcoming coaching slots" description="Use this area to track mentoring activity and planned conversations." />
                <div className="mt-6 grid gap-3">
                  {mentorSessions.map((session) => (
                    <div key={session.date} className="rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{session.topic}</span>
                        <span className="home-text-muted text-sm">{session.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="notifications" className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Notifications" title="Recent updates" description="A responsive activity panel for alerts, reminders, and recommendations." />
                <div className="mt-6 grid gap-3">
                  {notifications.map((notification) => (
                    <div key={notification} className="home-text-muted rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3 text-sm">
                      {notification}
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Quick Links" title="Navigate your workspace" description="Responsive links for returning to the home page and auth flows." />
                <div className="mt-6 grid gap-3">
                  <Link className="home-text-primary rounded-2xl bg-[rgba(193,18,31,0.08)] px-4 py-3 font-semibold" to="/">
                    Home
                  </Link>
                  <Link className="home-text-primary rounded-2xl bg-[rgba(193,18,31,0.08)] px-4 py-3 font-semibold" to="/login">
                    Login
                  </Link>
                  <Link className="home-text-primary rounded-2xl bg-[rgba(193,18,31,0.08)] px-4 py-3 font-semibold" to="/roles">
                    Role selection
                  </Link>
                </div>
              </Card>
            </section>
          </main>
        </div>
      </Container>
    </div>
  );
}