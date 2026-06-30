import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppIcon } from "./AppIcon";
import { Sparkles, Heart, Palette, Volume2 } from "lucide-react";

export function AppStart() {
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
    <div
      className="relative w-full min-h-dvh"
      style={{ background: "linear-gradient(140deg, #F4F8FF 0%, #ffffff 60%)" }}
    >
      {/* Soft animated accent orbs (background layer — never causes scroll) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 left-10 w-80 h-80 rounded-full bg-[#A4C2F4]/30 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-10 w-96 h-96 rounded-full bg-[#E8F0FE]/60 blur-3xl"
          animate={{ x: [0, -32, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-dvh flex flex-col items-center justify-center px-8 py-12">
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
            className="text-5xl md:text-7xl font-black text-[#333] mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Soothe Baby
          </h1>
          <p
            className="text-lg md:text-2xl text-[#5F6368] font-medium px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
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
                className="bg-white border border-[#E8F0FE] rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#1A73E8]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[#333] mb-2"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-[#5F6368] text-sm"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
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
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/play/canvas")}
            className="bg-[#1A73E8] text-white font-black px-12 py-5 rounded-xl text-lg hover:bg-[#1557b0] transition-colors shadow-lg hover:shadow-xl"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Start Playing ✨
          </motion.button>
        </motion.div>

        {/* Age indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-[#5F6368]/80 text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Designed for infants 0-2 years old
        </motion.p>
      </div>
    </div>
  );
}
