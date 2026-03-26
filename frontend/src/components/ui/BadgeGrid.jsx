import BadgeCard from './BadgeCard.jsx';

const badges = [
  { icon: '🔥', title: '7 Day Streak', desc: 'Study 7 days in a row', unlocked: true },
  { icon: '🚀', title: 'First Step', desc: 'Complete your first study session', unlocked: true },
  { icon: '🎯', title: 'Focus Master', desc: 'Study for 5 days without missing', unlocked: false },
  { icon: '🌙', title: 'Night Owl', desc: 'Study after 10pm', unlocked: false },
];

export default function BadgeGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {badges.map((badge, i) => (
        <BadgeCard key={i} {...badge} />
      ))}
    </div>
  );
}
