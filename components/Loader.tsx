"use client";

import { motion } from "framer-motion";

type LoaderProps = {
  mode?: "full" | "inline";
  variant?: "spinner" | "dots" | "progress";
};

const Spinner = () => (
  <div className="relative h-16 w-16">
    <motion.div
      className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-primary/60"
      animate={{ rotate: -360 }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-4 rounded-full border-2 border-primary/20"
      animate={{ opacity: [1, 0.45, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"
      animate={{ scale: [1, 0.6, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const Loader = ({ mode = "inline", variant = "spinner" }: LoaderProps) => {
  const isFull = mode === "full";

  return (
    <div
      className={
        isFull
          ? "fixed inset-0 z-50 flex items-center justify-center"
          : "absolute inset-0 z-20 flex items-center justify-center"
      }
    >
      <div
        className={
          isFull
            ? "absolute inset-0 bg-muted/50 backdrop-blur-md"
            : "absolute inset-0 bg-muted/30 backdrop-blur-sm"
        }
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        <Spinner />

        {variant === "spinner" && (
          <motion.p
            className="text-sm font-medium text-foreground tracking-wide"
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading...
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Loader;
