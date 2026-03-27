import { Award, Calendar, Star, Trophy, Medal, Crown, Zap, Flame, Target, Users } from 'lucide-react'

const achievements = [
  {
    id: 1,
    title: 'First Hackathon',
    description: 'Participated in your first hackathon event',
    icon: Trophy,
    color: 'bg-secondary/20 text-secondary',
    date: 'Jan 15, 2024',
    badge: 'bronze',
  },
  {
    id: 2,
    title: 'Quick Learner',
    description: 'Completed 5 skills in the roadmap',
    icon: Zap,
    color: 'bg-primary/20 text-primary',
    date: 'Feb 20, 2024',
    badge: 'silver',
  },
  {
    id: 3,
    title: 'Team Player',
    description: 'Joined a team for a hackathon project',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-600',
    date: 'Mar 10, 2024',
    badge: 'bronze',
  },
  {
    id: 4,
    title: 'Event Enthusiast',
    description: 'Attended 3 or more hackathons',
    icon: Calendar,
    color: 'bg-highlight/20 text-highlight',
    date: 'Apr 5, 2024',
    badge: 'silver',
  },
  {
    id: 5,
    title: 'Skill Master',
    description: 'Mastered 10 skills in your roadmap',
    icon: Star,
    color: 'bg-purple-100 text-purple-600',
    date: 'May 18, 2024',
    badge: 'gold',
  },
  {
    id: 6,
    title: 'Consistency King',
    description: 'Logged in for 7 consecutive days',
    icon: Flame,
    color: 'bg-orange-100 text-orange-600',
    date: 'Jun 1, 2024',
    badge: 'bronze',
  },
  {
    id: 7,
    title: 'Goal Getter',
    description: 'Completed all weekly goals',
    icon: Target,
    color: 'bg-pink-100 text-pink-600',
    date: 'Jun 15, 2024',
    badge: 'silver',
  },
  {
    id: 8,
    title: 'Community Star',
    description: 'Connected with 10+ peers',
    icon: Crown,
    color: 'bg-amber-100 text-amber-600',
    date: 'Jul 20, 2024',
    badge: 'gold',
  },
  {
    id: 9,
    title: 'Medalist',
    description: 'Won a prize in a hackathon',
    icon: Medal,
    color: 'bg-cyan-100 text-cyan-600',
    date: 'Aug 10, 2024',
    badge: 'gold',
  },
]

const badgeColors = {
  bronze: 'from-amber-700 to-amber-900',
  silver: 'from-gray-300 to-gray-500',
  gold: 'from-yellow-400 to-yellow-600',
}

function Achievements() {
  const earnedCount = achievements.length
  const totalPossible = achievements.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative">
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="mt-1 text-white/80">Track your progress and earn badges</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{earnedCount}/{totalPossible}</p>
              <p className="text-sm text-white/80">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h2 className="text-lg font-semibold text-heading mb-4">Your Badges</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${achievement.color}`}>
                  <achievement.icon className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-heading group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm text-body line-clamp-2">
                    {achievement.description}
                  </p>
                  <p className="mt-2 text-xs text-body/60">
                    Earned: {achievement.date}
                  </p>
                </div>
                <div className={`shrink-0 rounded-full bg-gradient-to-br ${badgeColors[achievement.badge]} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                  {achievement.badge.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achievements
