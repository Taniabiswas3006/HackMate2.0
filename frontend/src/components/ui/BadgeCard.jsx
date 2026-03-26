import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function BadgeCard({ icon, title, desc, unlocked }) {
  return (
    <motion.div
      className={`relative flex flex-col items-center rounded-2xl p-5 shadow-soft border bg-white/90 dark:bg-card transition-all duration-200 ${unlocked ? 'hover:scale-105 hover:shadow-lg' : 'opacity-60 blur-[2px]'}`}
      whileHover={unlocked ? { scale: 1.08 } : {}}
      initial={{ scale: 1 }}
      animate={unlocked ? { scale: [1, 1.05, 1] } : {}}
      transition={unlocked ? { type: 'spring', stiffness: 300, damping: 10, repeat: 0 } : {}}
    >
      <div className={`text-3xl mb-2 ${unlocked ? '' : 'text-gray-400'}`}>{icon}</div>
      <div className={`font-semibold text-lg ${unlocked ? 'text-teal-600' : 'text-gray-400'}`}>{title}</div>
      <div className="text-xs text-body/80 mt-1 text-center">{desc}</div>
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
      )}
    </motion.div>
  );
}
