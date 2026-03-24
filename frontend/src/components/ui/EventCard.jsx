import { CalendarDays, MapPin } from 'lucide-react'
import Button from './Button.jsx'

const levelColors = {
    Beginner: 'bg-accent/15 text-emerald-700',
    Intermediate: 'bg-primary/15 text-primary',
    Advanced: 'bg-secondary/20 text-purple-700',
}

function EventCard({ event }) {
    return (
        <div className="rounded-2xl border border-primary/10 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg">
            <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-heading">{event.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${levelColors[event.level] || levelColors.Beginner}`}>
                    {event.level}
                </span>
            </div>

            <div className="mt-3 space-y-2 text-sm text-body">
                {event.location && (
                    <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                    </p>
                )}
                {event.date && (
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-secondary" />
                        {event.date}
                    </p>
                )}
                {event.domain && (
                    <p className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {event.domain}
                        </span>
                    </p>
                )}
            </div>

            <Button className="mt-4 w-full">Apply Now</Button>
        </div>
    )
}

export default EventCard
