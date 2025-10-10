"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-neutral-950 dark:to-neutral-900 overflow-hidden">
      {/* Floating dots background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full"
            initial={{
              y: Math.random() * 800,
              x: Math.random() * 800,
              opacity: 0.5,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 1.5,
            }}
          />
        ))}
      </div>

      {/* Animated Logo Circle */}
      <motion.div
        className="relative w-20 h-20 border-[5px] border-neutral-300 dark:border-neutral-700 rounded-full flex items-center justify-center"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-[6px] border-[3px] border-t-neutral-900 border-r-transparent border-l-transparent border-b-neutral-500 dark:border-t-white dark:border-b-neutral-700 rounded-full"></div>
      </motion.div>

      {/* Brand Text with shimmer */}
      <motion.h1
        className="mt-8 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-neutral-900 via-neutral-400 to-neutral-900 dark:from-white dark:via-neutral-500 dark:to-white bg-clip-text text-transparent animate-text-shimmer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nexora
      </motion.h1>

      {/* Subtext fade pulse */}
      <motion.p
        className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Loading your experience...
      </motion.p>
    </div>
  );
}
