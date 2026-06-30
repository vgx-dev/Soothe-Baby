import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface AppIconProps {
  size?: number;
  animated?: boolean;
}

export function AppIcon({ size = 120, animated = false }: AppIconProps) {
  const iconMotion = animated
    ? {
        animate: {
          rotate: [0, 5, -5, 0],
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      }
    : {};

  return (
    <motion.div
      {...iconMotion}
      className="inline-flex items-center justify-center rounded-[28%] shadow-lg relative overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #1A73E8 0%, #A4C2F4 100%)",
      }}
    >
      {/* Subtle glow overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 60%)",
        }}
      />

      {/* Icon content */}
      <div className="relative z-10 flex items-center justify-center">
        <Sparkles
          className="text-white drop-shadow-lg"
          style={{ width: size * 0.5, height: size * 0.5 }}
          strokeWidth={2.5}
        />
      </div>

      {/* Floating particles */}
      {animated && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-white/60"
            animate={{
              x: [10, 30, 10],
              y: [20, 40, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{
              x: [size - 30, size - 15, size - 30],
              y: [30, 50, 30],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
