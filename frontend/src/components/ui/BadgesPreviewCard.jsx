import BadgeCard from './BadgeCard.jsx';
import { Link } from 'react-router-dom';

const previewBadges = [
  { icon: '🔥', title: '7 Day Streak', unlocked: true },
  { icon: '🚀', title: 'First Step', unlocked: true },
  { icon: '🎯', title: 'Focus Master', unlocked: false },
];

export default function BadgesPreviewCard() {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white/90 dark:bg-card p-5 shadow-soft flex flex-col items-center w-full max-w-xs">
      <div className="flex gap-3 mb-2">
        {previewBadges.map((badge, i) => (
          <span
            key={i}
            className={`text-2xl ${badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}
            title={badge.title}
          >
            {badge.icon}
          </span>
        ))}
      </div>
      <div className="text-xs text-body/80 mb-2">Badges</div>
      <Link to="/profile" className="text-teal-600 text-xs font-medium hover:underline mt-1">View All &rarr;</Link>
    </div>
  );
}
