import { GraduationCap } from 'lucide-react'

const levelColors = {
    Beginner: 'bg-accent/20 text-emerald-700',
    Intermediate: 'bg-primary/15 text-primary',
    Advanced: 'bg-secondary/20 text-purple-700',
}

function ProfileCard({ user }) {
    return (
        <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-soft">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary">
                    {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-heading">{user.name}</h2>
                    <p className="text-sm text-body">
                        {user.department || user.branch} · {user.year}
                    </p>
                </div>
            </div>

            {/* Level Badge */}
            {user.level && (
                <div className="mt-4 inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${levelColors[user.level] || levelColors.Beginner}`}>
                        {user.level}
                    </span>
                </div>
            )}

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-body">Interests</p>
                    <div className="flex flex-wrap gap-1.5">
                        {user.interests.map((interest) => (
                            <span
                                key={interest}
                                className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-purple-600"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileCard
