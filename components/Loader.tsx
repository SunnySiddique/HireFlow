"use client";

import { motion } from "framer-motion";

type LoaderProps = {
  mode?: "full" | "inline";
};

const Loader = ({ mode = "inline" }: LoaderProps) => {
  const isFull = mode === "full";

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  const spinReverseVariants = {
    animate: {
      rotate: -360,
      transition: { duration: 3, repeat: Infinity, ease: "linear" },
    },
  };

  const pulseVariants = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div
      className={
        isFull
          ? "fixed inset-0 z-50 flex items-center justify-center"
          : "absolute inset-0 z-20 flex items-center justify-center"
      }
    >
      {/* 🔥 BLUR BACKDROP (ALWAYS RENDERED) */}
      <div
        className={
          isFull
            ? "absolute inset-0 bg-black/30 backdrop-blur-md"
            : "absolute inset-0 bg-black/10 backdrop-blur-sm"
        }
      />

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <div className="relative h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
            variants={spinVariants}
            animate="animate"
            style={{
              filter: "drop-shadow(0 0 8px rgba(216, 121, 67, 0.6))",
            }}
          />

          <motion.div
            className="absolute inset-2 rounded-full border-3 border-transparent border-t-primary/60"
            variants={spinReverseVariants}
            animate="animate"
            style={{
              filter: "drop-shadow(0 0 6px rgba(216, 121, 67, 0.4))",
            }}
          />

          <motion.div
            className="absolute inset-4 rounded-full border-2 border-primary/40"
            variants={pulseVariants}
            animate="animate"
          />
        </div>

        <p className="text-lg font-medium text-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
