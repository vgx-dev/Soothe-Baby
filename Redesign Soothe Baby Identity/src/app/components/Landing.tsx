import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { GlassButton } from "./GlassButton";
import { AppIcon } from "./AppIcon";
import { Sparkles, Heart, Palette, Volume2 } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "Magical Touch",
      description: "Tap anywhere to create glowing, floating shapes",
    },
    {
      icon: Heart,
      title: "Calm & Soothe",
      description: "Gentle animations designed for infant development",
    },
    {
      icon: Palette,
      title: "Rich Colors",
      description: "Vibrant, safe colors that capture attention",
    },
    {
      icon: Volume2,
      title: "Sensory Play",
      description: "Engaging visual feedback for tiny explorers",
    },
  ];

  return (
    <div className="size-full overflow-hidden relative">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8] via-[#7B2CBF] to-[#FF006E]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD60A]/40 to-[#FCA311]/40 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#06FFA5]/30 to-[#1A73E8]/30 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 size-full flex flex-col items-center justify-center p-8">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-6 flex justify-center">
            <AppIcon size={120} animated />
          </div>
          
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl"
            style={{ fontFamily: "Baloo 2, sans-serif" }}
          >
            Soothe Baby
          </h1>
          <p
            className="text-lg md:text-2xl text-white/90 font-medium px-4"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            A sensory touch experience for your little one
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-12 w-full px-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: "Baloo 2, sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-white/80 text-sm"
                      style={{ fontFamily: "Fredoka, sans-serif" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassButton
            onClick={() => navigate("/play")}
            variant="secondary"
            size="lg"
          >
            Start Playing ✨
          </GlassButton>
        </motion.div>

        {/* Age indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-white/70 text-sm"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Designed for infants 0-2 years old
        </motion.p>

        {/* Product Hunt Preview Link (Development) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-4"
        >
          <button
            onClick={() => navigate("/preview")}
            className="text-white/50 hover:text-white/80 text-xs underline transition-colors"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            View Brand Assets
          </button>
        </motion.div>
      </div>
    </div>
  );
}