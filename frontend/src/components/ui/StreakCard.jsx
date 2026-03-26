import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

const streakDays = [true, true, true, false, true, true, true]; // last 7 days, true = completed

export default function StreakCard({ streak = 7 }) {
  return (
    <motion.div
      className="relative flex flex-col items-end rounded-2xl bg-white/90 dark:bg-card p-5 shadow-soft border border-orange-100"
      initial={{ boxShadow: '0 0 0 0 #FDBA74' }}
      animate={{ boxShadow: streak > 0 ? '0 0 16px 2px #FDBA74' : '0 0 0 0 #FDBA74' }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
    >
      <div className="flex items-center gap-2 group cursor-pointer" data-tooltip-id="streak-tip">
        <span className="text-2xl md:text-3xl animate-pulse">🔥</span>
        <span className="font-bold text-orange-500 text-lg md:text-xl">{streak} Day Streak</span>
      </div>
      <Tooltip id="streak-tip" place="top" content="Keep your streak alive by studying daily!" />
      <div className="mt-3 flex gap-2">
        {streakDays.map((done, i) => (
          <motion.div
            key={i}
            className={`h-4 w-4 rounded-full border-2 ${done ? 'bg-orange-400 border-orange-400 shadow-orange-200' : 'bg-gray-200 border-gray-300'} `}
            animate={done ? { scale: [1, 1.2, 1] } : {}}
            transition={done ? { duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 } : {}}
          />
        ))}
      </div>
    </motion.div>
  );
}
