import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AudioVisualizer = ({
  active,
  colorClass = "bg-primary",
}: {
  active: boolean;
  colorClass?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-12">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={i}
          initial={{ height: 4 }}
          animate={{
            height: active ? [8, Math.random() * 24 + 16, 8] : 4,
            opacity: active ? 1 : 0.3,
          }}
          transition={{
            repeat: Infinity,
            duration: active ? 0.6 + i * 0.1 : 0.3,
            ease: "easeInOut",
          }}
          className={cn("w-1.5 rounded-full", colorClass)}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
