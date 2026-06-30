import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GlassButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: GlassButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-br from-[#1A73E8]/90 to-[#1557B0]/90 text-white shadow-lg shadow-[#1A73E8]/30",
    secondary:
      "bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-lg",
    minimal: "bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-5 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full font-bold
        transition-all duration-200
        ${className}
      `}
      style={{ fontFamily: "Baloo 2, sans-serif" }}
    >
      {children}
    </motion.button>
  );
}
