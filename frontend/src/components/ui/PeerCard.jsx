import Button from './Button.jsx'

const avatarColors = [
    'bg-primary/15 text-primary',
    'bg-secondary/20 text-purple-600',
    'bg-accent/20 text-emerald-600',
    'bg-highlight/20 text-pink-600',
]

function PeerCard({ peer, index = 0 }) {
    return (
        <div className="rounded-2xl border border-primary/10 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold ${avatarColors[index % avatarColors.length]}`}
                >
                    {peer.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-heading">{peer.name}</h3>
                    <p className="text-xs text-body">
                        {peer.branch
                            ? `${peer.branch} (Year ${peer.year})`
                            : peer.interests?.join(' · ')}
                    </p>
                </div>
            </div>

            {peer.skills && peer.skills.length > 0 && (
                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-body">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                        {peer.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {peer.interests && peer.interests.length > 0 && peer.branch && (
                <div className="mt-3">
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-body">Interests</p>
                    <p className="text-xs text-body">{peer.interests.join(', ')}</p>
                </div>
            )}

            <Button className="mt-4 w-full">Connect</Button>
        </div>
    )
}

export default PeerCard
