// FadeIn.tsx
import { motion } from 'framer-motion';

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      key={Math.random()} // Force remount on each render to re-trigger animation
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='w-full h-full'
    >
      {children}
    </motion.div>
  );
}
