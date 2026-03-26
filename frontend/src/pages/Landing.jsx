import Navbar from '../components/layout/Navbar.jsx'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Compass,
  Heart,
  HelpCircle,
  Lightbulb,
  MapPin,
  Network,
  Rocket,
  Search,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../components/layout/Footer.jsx'
import Button from '../components/ui/Button.jsx'
import { ShuffleGrid } from '../components/ui/ShuffleGrid.jsx'

/* ---------- data ---------- */

const problems = [
  {
    icon: HelpCircle,
    title: "Don't know where to start",
    desc: 'Overwhelming resources and no clear direction make it hard for beginners to take the first step.',
    color: 'bg-primary/15 text-primary',
  },
  {
    icon: Search,
    title: 'Miss hackathons & events',
    desc: 'Students miss great opportunities simply because they never hear about them in time.',
    color: 'bg-secondary/20 text-purple-600',
  },
  {
    icon: Target,
    title: 'Feel unprepared for tech events',
    desc: 'Lack of guidance and practice leaves students anxious and under-confident before events.',
    color: 'bg-highlight/20 text-pink-600',
  },
]

const steps = [
  { num: '01', title: 'Enter your details', desc: 'Tell us your skills, interests, and goals.', icon: BookOpen, color: 'from-primary/20 to-primary/5' },
  { num: '02', title: 'Get a personalized roadmap', desc: 'Receive a step-by-step learning plan tailored to you.', icon: Compass, color: 'from-secondary/20 to-secondary/5' },
  { num: '03', title: 'Discover opportunities', desc: 'Find hackathons, events, and peers that match your profile.', icon: Rocket, color: 'from-accent/20 to-accent/5' },
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
    color: 'bg-secondary/15 text-purple-600',
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
  { value: '50+', label: 'Hackathons listed', color: 'text-purple-600' },
  { value: '10+', label: 'Domains covered', color: 'text-emerald-600' },
  { value: '24/7', label: 'Access anywhere', color: 'text-pink-600' },
]

/* ---------- component ---------- */

function Landing() {
  return (
    <div className="min-h-screen bg-main">
      <Navbar />

      {/* ───── HERO (SPLIT LAYOUT) ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/8 to-main" />
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left Side: Text */}
            <div className="animate-fade-in-up md:max-w-2xl lg:max-w-none">
              {/* Built for Students badge removed */}

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-heading sm:text-6xl lg:text-7xl">
                HackMate
              </h1>

              <p className="mt-4 max-w-xl text-lg text-body sm:text-xl">
                From learning to real opportunities
              </p>

              {/* Animated tagline */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold sm:text-base">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-primary">Learn</span>
                <ChevronRight className="h-4 w-4 text-body/40" />
                <span className="rounded-full bg-secondary/15 px-4 py-1.5 text-purple-600">Build</span>
                <ChevronRight className="h-4 w-4 text-body/40" />
                <span className="rounded-full bg-accent/15 px-4 py-1.5 text-emerald-600">Participate</span>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/signup">
                  <Button className="px-8 py-3 text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {/* Explore button removed */}
              </div>
            </div>

            {/* Right Side: Animated Grid */}
            <div className="relative hidden lg:block">
              {/* Decorative backgrounds for grid */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 blur-xl filter" />
              <ShuffleGrid />
            </div>
            {/* Mobile/Tablet Grid */}
            <div className="relative lg:hidden">
              <ShuffleGrid />
            </div>
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

      {/* ───── WHY HACKMATE ───── */}
      <section className="bg-secondary/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-2 inline-block rounded-full bg-secondary/15 px-4 py-1 text-xs font-medium text-purple-600">
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
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            {/* Social Proof badge removed */}
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/8 to-section py-20">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-heading sm:text-4xl">
            Start your journey today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body">
            Join hundreds of students who are building skills, discovering opportunities, and growing together.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button className="px-10 py-3.5 text-base">
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
