import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Container, InputField, Typography } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Users', href: '#users' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Business Ideas', href: '#business-ideas' },
  { label: 'Roadmaps', href: '#roadmaps' },
  { label: 'Courses', href: '#courses' },
  { label: 'Reports', href: '#reports' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Role Management', href: '#roles' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Approvals', href: '#approvals' }
];

const users = [
  { name: 'Alicia Grant', email: 'alicia@entskill.com', role: 'mentor', status: 'Active' },
  { name: 'Jordan Miles', email: 'jordan@entskill.com', role: 'user', status: 'Pending' },
  { name: 'Priya Shah', email: 'priya@entskill.com', role: 'admin', status: 'Active' },
  { name: 'Marcus Lee', email: 'marcus@entskill.com', role: 'mentor', status: 'Suspended' }
];

const mentors = [
  { name: 'Alicia Grant', expertise: 'Funding', sessions: 24, status: 'Approved' },
  { name: 'Marcus Lee', expertise: 'Operations', sessions: 18, status: 'Pending' },
  { name: 'Priya Shah', expertise: 'Growth', sessions: 31, status: 'Approved' }
];

const businessIdeas = [
  { title: 'Neighborhood Meal Prep', category: 'Food', budget: 'Low', status: 'Approved' },
  { title: 'Digital Learning Lab', category: 'Digital Services', budget: 'Low', status: 'Review' },
  { title: 'Senior Support Concierge', category: 'Care Services', budget: 'Low', status: 'Approved' }
];

const roadmaps = [
  { title: 'Launch Roadmap', progress: 82, owner: 'Jordan Miles' },
  { title: 'Funding Roadmap', progress: 64, owner: 'Alicia Grant' },
  { title: 'Growth Roadmap', progress: 91, owner: 'Priya Shah' }
];

const courses = [
  { title: 'Startup Foundations', level: 'Beginner', enrollment: 420 },
  { title: 'Revenue Planning', level: 'Intermediate', enrollment: 286 },
  { title: 'Growth Strategy', level: 'Advanced', enrollment: 198 }
];

const feedback = [
  { name: 'Jordan Miles', rating: 5, note: 'The dashboard is easy to scan on mobile.' },
  { name: 'Priya Shah', rating: 4, note: 'Approval flow could be faster for mentors.' },
  { name: 'Alicia Grant', rating: 5, note: 'The learning modules are very practical.' }
];

const approvals = [
  { item: 'New mentor registration', type: 'Mentor', priority: 'High' },
  { item: 'Business idea submission', type: 'Idea', priority: 'Medium' },
  { item: 'Course publish request', type: 'Course', priority: 'Low' }
];

const roleAssignments = [
  { role: 'user', count: 1240, color: 'bg-[linear-gradient(90deg,#ff6b6b,#e63946)]' },
  { role: 'mentor', count: 96, color: 'bg-[linear-gradient(90deg,#e63946,#c1121f)]' },
  { role: 'admin', count: 12, color: 'bg-[linear-gradient(90deg,#c1121f,#8a0d17)]' }
];

const reports = [
  { title: 'Monthly activity', value: '3.2k actions' },
  { title: 'Approval rate', value: '87%' },
  { title: 'Mentor response time', value: '14h' },
  { title: 'Content reach', value: '18.4k views' }
];

const analyticsBars = [72, 64, 84, 59, 91, 77];

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

function StatsCard({ label, value, delta }) {
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

function MiniChart({ values }) {
  const maxValue = Math.max(...values);

  return (
    <Card elevated className="border-[rgba(193,18,31,0.08)] p-0">
      <div className="border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
        <Typography variant="h4" as="h3">
          Platform activity
        </Typography>
      </div>
      <div className="grid gap-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => (
          <div key={index} className="rounded-3xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(180deg,rgba(255,248,248,0.5),#fff)] p-4">
            <div className="flex h-40 items-end gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
                className="w-full rounded-2xl bg-[linear-gradient(180deg,#ff6b6b_0%,#e63946_50%,#c1121f_100%)] shadow-[0_10px_24px_rgba(193,18,31,0.18)]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="home-text-base font-semibold">Week {index + 1}</span>
              <span className="home-text-muted">{value}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResponsiveTable({ title, columns, rows, rowRenderer }) {
  return (
    <Card elevated className="border-[rgba(193,18,31,0.08)] p-0">
      <div className="border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
        <Typography variant="h4" as="h3">
          {title}
        </Typography>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="bg-[rgba(193,18,31,0.04)] home-text-muted">
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4 font-semibold uppercase tracking-[0.18em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="even:bg-[rgba(193,18,31,0.02)]">
                {rowRenderer(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [filters, setFilters] = useState({ search: '', role: 'all', status: 'all' });

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const matchesSearch = [item.name, item.email, item.role, item.status].join(' ').toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = filters.role === 'all' ? true : item.role === filters.role;
      const matchesStatus = filters.status === 'all' ? true : item.status.toLowerCase() === filters.status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [filters]);

  const statCards = [
    { label: 'Users', value: '1,240', delta: '+12%' },
    { label: 'Mentors', value: '96', delta: '+5%' },
    { label: 'Ideas', value: '318', delta: '+19%' },
    { label: 'Approvals', value: '42', delta: '+8%' }
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
                    {user?.name?.slice(0, 1)?.toUpperCase() ?? 'A'}
                  </div>
                  <div>
                    <Typography variant="h4" as="h2">
                      Admin Panel
                    </Typography>
                    <Typography variant="caption" className="home-text-muted mt-1">
                      {user?.email ?? 'admin@example.com'}
                    </Typography>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <ul className="grid gap-2">
                  {navItems.map((item) => (
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
            <section id="overview" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle
                  eyebrow="Overview"
                  title="Admin dashboard for operations, approvals, and growth"
                  description="Monitor user activity, content approvals, reporting, and platform health from a single responsive workspace."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {statCards.map((stat) => (
                    <StatsCard key={stat.label} {...stat} />
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)] p-0">
                <div className="border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
                  <Typography variant="h4" as="h3">
                    Reports snapshot
                  </Typography>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {reports.map((report) => (
                    <div key={report.title} className="rounded-3xl border border-[rgba(193,18,31,0.08)] bg-[linear-gradient(180deg,rgba(255,248,248,0.7),#fff)] p-4">
                      <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                        {report.title}
                      </Typography>
                      <Typography variant="h4" as="p" className="home-text-primary mt-2">
                        {report.value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="analytics" className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <MiniChart values={analyticsBars} />

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle
                  eyebrow="Analytics"
                  title="Audience and platform trends"
                  description="Charts stay lightweight and responsive while still giving a quick read on relative distribution."
                />

                <div className="mt-6 grid gap-4">
                  {roleAssignments.map((item) => (
                    <div key={item.role} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold capitalize">{item.role}</span>
                        <span className="home-text-muted">{item.count} accounts</span>
                      </div>
                      <div className="h-3 rounded-full bg-[rgba(193,18,31,0.08)]">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(item.count / 15, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="users">
              <SectionTitle
                eyebrow="Users"
                title="Responsive user management table"
                description="Search and filter users by role and status. The table scrolls horizontally on smaller screens instead of collapsing."
              />

              <Card elevated className="mt-6 border-[rgba(193,18,31,0.08)]">
                <div className="grid gap-4 border-b border-[rgba(193,18,31,0.08)] p-5 md:grid-cols-3">
                  <InputField
                    label="Search"
                    value={filters.search}
                    onChange={(event) => setFilters({ ...filters, search: event.target.value })}
                    placeholder="Search users"
                  />
                  <InputField
                    label="Role"
                    value={filters.role}
                    onChange={(event) => setFilters({ ...filters, role: event.target.value })}
                    placeholder="all, user, mentor, admin"
                  />
                  <InputField
                    label="Status"
                    value={filters.status}
                    onChange={(event) => setFilters({ ...filters, status: event.target.value })}
                    placeholder="all, active, pending, suspended"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead>
                      <tr className="bg-[rgba(193,18,31,0.04)] home-text-muted">
                        {['Name', 'Email', 'Role', 'Status', 'Actions'].map((column) => (
                          <th key={column} className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4 font-semibold uppercase tracking-[0.18em]">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((item) => (
                        <tr key={item.email} className="even:bg-[rgba(193,18,31,0.02)]">
                          <td className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4 font-semibold">{item.name}</td>
                          <td className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4 home-text-muted">{item.email}</td>
                          <td className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4 capitalize">{item.role}</td>
                          <td className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
                            <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold">
                              {item.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap border-b border-[rgba(193,18,31,0.08)] px-5 py-4">
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="secondary">
                                Edit
                              </Button>
                              <Button size="sm" variant="ghost">
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section id="mentors" className="grid gap-6 lg:grid-cols-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Mentors" title="Mentor management" description="Review mentors, experience, and approval status." />
                <div className="mt-6 grid gap-3">
                  {mentors.map((mentor) => (
                    <div key={mentor.name} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <Typography variant="h4" as="h3">
                            {mentor.name}
                          </Typography>
                          <Typography variant="caption" className="home-text-muted mt-1">
                            {mentor.expertise}
                          </Typography>
                        </div>
                        <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold">
                          {mentor.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="home-text-muted">Sessions</span>
                        <span className="font-semibold">{mentor.sessions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Role Management" title="Assign and control access" description="High-level role controls are presented here without backend actions." />
                <div className="mt-6 grid gap-4">
                  {roleAssignments.map((item) => (
                    <div key={item.role} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold capitalize">{item.role}</span>
                        <span className="home-text-muted">{item.count} users</span>
                      </div>
                      <div className="mt-3 h-3 rounded-full bg-[rgba(193,18,31,0.08)]">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(item.count / 14, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="business-ideas" className="grid gap-6 lg:grid-cols-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Business Ideas" title="Submitted concepts" description="A compact review list for idea evaluation and moderation." />
                <div className="mt-6 grid gap-3">
                  {businessIdeas.map((idea) => (
                    <div key={idea.title} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <Typography variant="h4" as="h3">
                            {idea.title}
                          </Typography>
                          <Typography variant="caption" className="home-text-muted mt-1">
                            {idea.category} • {idea.budget}
                          </Typography>
                        </div>
                        <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold">
                          {idea.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Roadmaps" title="Milestone tracking" description="Monitor progress on active roadmap plans." />
                <div className="mt-6 grid gap-4">
                  {roadmaps.map((roadmap) => (
                    <div key={roadmap.title} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold">{roadmap.title}</span>
                        <span className="home-text-muted">{roadmap.owner}</span>
                      </div>
                      <div className="h-3 rounded-full bg-[rgba(193,18,31,0.08)]">
                        <div className="h-full rounded-full bg-[linear-gradient(90deg,#ff6b6b,#e63946,#c1121f)]" style={{ width: `${roadmap.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="courses" className="grid gap-6 lg:grid-cols-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Courses" title="Content and enrollment" description="Track learning offerings and course uptake." />
                <div className="mt-6 grid gap-3">
                  {courses.map((course) => (
                    <div key={course.title} className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <Typography variant="h4" as="h3">
                            {course.title}
                          </Typography>
                          <Typography variant="caption" className="home-text-muted mt-1">
                            {course.level}
                          </Typography>
                        </div>
                        <span className="home-text-primary text-sm font-semibold">{course.enrollment} enrollments</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Charts" title="Performance overview" description="A small sparkline-style block that stays responsive without extra dependencies." />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                    <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                      Trend line
                    </Typography>
                    <svg viewBox="0 0 240 120" className="mt-4 h-32 w-full">
                      <defs>
                        <linearGradient id="adminTrend" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#ff6b6b" />
                          <stop offset="50%" stopColor="#e63946" />
                          <stop offset="100%" stopColor="#c1121f" />
                        </linearGradient>
                      </defs>
                      <polyline
                        fill="none"
                        stroke="url(#adminTrend)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="10,92 44,74 78,80 112,54 146,62 180,30 220,44"
                      />
                    </svg>
                  </div>

                  <div className="rounded-3xl border border-[rgba(193,18,31,0.08)] p-4">
                    <Typography variant="caption" className="home-text-muted uppercase tracking-[0.18em]">
                      Distribution
                    </Typography>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: 'Users', value: '72%' },
                        { label: 'Mentors', value: '18%' },
                        { label: 'Admins', value: '10%' }
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

            <section id="reports" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Reports" title="Operational reporting" description="Daily and monthly reporting in a concise summary block." />
                <div className="mt-6 grid gap-3">
                  {[
                    'Daily moderation queue updated 14 minutes ago.',
                    'Mentor approvals are within SLA for the week.',
                    'Business idea submissions increased by 12% month over month.',
                    'Course completion improved after the latest content refresh.'
                  ].map((report) => (
                    <div key={report} className="home-text-muted rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3 text-sm">
                      {report}
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Approvals" title="Pending review items" description="Moderation tasks for admin sign-off." />
                <div className="mt-6 grid gap-3">
                  {approvals.map((approval) => (
                    <div key={approval.item} className="rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="m-0 font-semibold">{approval.item}</p>
                          <p className="home-text-muted m-0 mt-1 text-sm">{approval.type}</p>
                        </div>
                        <span className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-3 py-1 text-xs font-semibold">
                          {approval.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="feedback" className="grid gap-6 lg:grid-cols-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Feedback" title="Recent feedback and sentiment" description="Quick feedback cards for product and content review." />
                <div className="mt-6 grid gap-3">
                  {feedback.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-[rgba(193,18,31,0.08)] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{item.name}</span>
                        <span className="home-text-primary text-sm font-semibold">{item.rating}/5</span>
                      </div>
                      <p className="home-text-muted m-0 mt-2 text-sm">{item.note}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Role Management" title="Access control overview" description="Responsive role chips for high-level access management." />
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { label: 'Users', count: 1240 },
                    { label: 'Mentors', count: 96 },
                    { label: 'Admins', count: 12 }
                  ].map((item) => (
                    <span key={item.label} className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold">
                      {item.label}: {item.count}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="secondary">Create Role</Button>
                  <Button variant="ghost">View Permissions</Button>
                </div>
              </Card>
            </section>

            <section className="pb-2">
              <Card elevated className="border-[rgba(193,18,31,0.08)]">
                <SectionTitle eyebrow="Navigation" title="Quick admin links" description="Move between the key platform modules from one central page." />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold" to="/">
                    Home
                  </Link>
                  <Link className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold" to="/login">
                    Login
                  </Link>
                  <Link className="home-text-primary rounded-full bg-[rgba(193,18,31,0.08)] px-4 py-2 text-sm font-semibold" to="/roles">
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