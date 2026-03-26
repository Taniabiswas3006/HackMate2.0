import Navbar from '../components/layout/Navbar.jsx'
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Heart,
  HelpCircle,
  MapPin,
  Network,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
  Code2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../components/layout/Footer.jsx'
import Button from '../components/ui/Button.jsx'

/* ---------- data ---------- */

const problems = [
  {
    icon: HelpCircle,
    title: "Don't know where to start",
    desc: 'Overwhelming resources and no clear direction make it hard for beginners to take the first step.',
    color: 'bg-primary/15 text-primary',
  },
  {
    icon: Target,
    title: 'Miss hackathons & events',
    desc: 'Students miss great opportunities simply because they never hear about them in time.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Rocket,
    title: 'Feel unprepared for tech events',
    desc: 'Lack of guidance and practice leaves students anxious and under-confident before events.',
    color: 'bg-highlight/20 text-highlight',
  },
]

const features = [
  {
    icon: Compass,
    title: 'Skill Roadmap',
    desc: 'A personalized checklist guiding you from beginner to job-ready, one skill at a time.',
    color: 'bg-primary/15 text-primary',
  },
  {
    icon: Trophy,
    title: 'Opportunity Discovery',
    desc: 'Curated hackathons, internships, and events matched to your skill level and interests.',
    color: 'bg-accent/15 text-emerald-600',
  },
  {
    icon: Network,
    title: 'Peer Connect',
    desc: 'Find teammates with complementary skills and build stronger project teams together.',
    color: 'bg-secondary/15 text-secondary',
  },
]

const benefits = [
  { icon: Heart, text: 'Beginner-friendly guidance — no prior experience needed' },
  { icon: Star, text: 'Personalized journey — not a one-size-fits-all course' },
  { icon: Zap, text: 'Real opportunities — hackathons & events, not just tutorials' },
  { icon: Users, text: 'Community driven — learn and grow with peers' },
]

const stats = [
  { value: '200+', label: 'Students exploring', color: 'text-primary' },
  { value: '50+', label: 'Hackathons listed', color: 'text-secondary' },
  { value: '10+', label: 'Domains covered', color: 'text-emerald-600' },
  { value: '24/7', label: 'Access anywhere', color: 'text-highlight' },
]

/* ---------- component ---------- */

function Landing() {
  return (
    <div className="min-h-screen bg-main">
      <Navbar />

      {/* ───── HERO WITH BACKGROUND IMAGE ───── */}
      <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&auto=format&fit=crop&q=80)' }}
        >
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl w-full text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">HackMate</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Take Charge of Your Future Now
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Lead with purpose, build boldly, and shape the future — your moment is now. Own it. Drive it.
          </p>
          
          <div className="mt-10 flex items-center gap-x-4">
            <Link to="/signup">
              <Button className="px-8 py-3 text-base bg-white text-primary hover:bg-white/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="secondary" className="px-8 py-3 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── PROBLEM ───── */}
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">Common Student Challenges</h2>
            <p className="mx-auto mt-3 max-w-lg text-body">These are the most frequent obstacles students face on their learning journey.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-primary/10 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.color}`}>
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-heading">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="bg-secondary/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">Everything You Need</h2>
            <p className="mx-auto mt-3 max-w-lg text-body">
              Tools and features designed to accelerate your tech journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-primary/10 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-heading">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY HACKMATE ───── */}
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-2 inline-block rounded-full bg-secondary/15 px-4 py-1 text-xs font-medium text-secondary">
                Why HackMate
              </span>
              <h2 className="text-3xl font-bold text-heading sm:text-4xl">
                Built different, for students
              </h2>
              <p className="mt-3 text-body">
                Unlike generic platforms, HackMate is purpose-built for students who want to go from zero to hackathon-ready.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((b) => (
                <div
                  key={b.text}
                  className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-card p-4 shadow-soft"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-heading">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="bg-secondary/20 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">
              Join a growing community
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-primary/10 bg-card p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-sm text-body">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start your journey today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Join hundreds of students who are building skills, discovering opportunities, and growing together.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button className="px-10 py-3.5 text-base bg-white text-primary hover:bg-white/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing