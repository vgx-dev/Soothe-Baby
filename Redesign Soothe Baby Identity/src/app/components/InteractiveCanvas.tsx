import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Home, Settings, Volume2, VolumeX } from "lucide-react";
import { GlassButton } from "./GlassButton";
import { SettingsModal } from "./SettingsModal";

interface Shape {
  id: string;
  x: number;
  y: number;
  type: "circle" | "star" | "heart" | "bubble";
  color: string;
  glow: string;
  shadowColor: string;
  size: number;
}

const colors = [
  { gradient: "from-[#1A73E8] to-[#4A9FF5]", glow: "rgba(26, 115, 232, 0.6)", shadowColor: "rgba(26, 115, 232, 0.4)" },
  { gradient: "from-[#FF006E] to-[#FF4D94]", glow: "rgba(255, 0, 110, 0.6)", shadowColor: "rgba(255, 0, 110, 0.4)" },
  { gradient: "from-[#FFD60A] to-[#FFC300]", glow: "rgba(255, 214, 10, 0.6)", shadowColor: "rgba(255, 214, 10, 0.4)" },
  { gradient: "from-[#06FFA5] to-[#00D9A3]", glow: "rgba(6, 255, 165, 0.6)", shadowColor: "rgba(6, 255, 165, 0.4)" },
  { gradient: "from-[#7B2CBF] to-[#9D4EDD]", glow: "rgba(123, 44, 191, 0.6)", shadowColor: "rgba(123, 44, 191, 0.4)" },
  { gradient: "from-[#FCA311] to-[#FF8C00]", glow: "rgba(252, 163, 17, 0.6)", shadowColor: "rgba(252, 163, 17, 0.4)" },
];

const shapeTypes: Array<"circle" | "star" | "heart" | "bubble"> = [
  "circle",
  "star",
  "heart",
  "bubble",
];

export function InteractiveCanvas() {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Hide welcome message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const randomSize = 60 + Math.random() * 80;

    const newShape: Shape = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      type: randomType,
      color: randomColor.gradient,
      glow: randomColor.glow,
      shadowColor: randomColor.shadowColor,
      size: randomSize,
    };

    setShapes((prev) => [...prev, newShape]);

    // Auto-remove shape after animation
    setTimeout(() => {
      setShapes((prev) => prev.filter((s) => s.id !== newShape.id));
    }, 4000);
  };

  return (
    <div className="size-full overflow-hidden relative select-none">
      {/* Rich gradient background - multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8] via-[#7B2CBF] to-[#FF006E]" />
      
      {/* Subtle animated pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Interactive Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        onTouchStart={handleTouch}
        onClick={handleTouch}
      >
        <AnimatePresence>
          {shapes.map((shape) => (
            <ShapeComponent key={shape.id} shape={shape} />
          ))}
        </AnimatePresence>
      </div>

      {/* Glassmorphic UI Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg"
        >
          <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
        </motion.button>

        {/* Sound toggle */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg"
        >
          {soundEnabled ? (
            <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
          ) : (
            <VolumeX className="w-6 h-6 text-white" strokeWidth={2.5} />
          )}
        </motion.button>
      </div>

      {/* App title indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 shadow-xl">
          <p
            className="text-white/90 text-sm font-semibold"
            style={{ fontFamily: "Baloo 2, sans-serif" }}
          >
            Tap anywhere to play
          </p>
        </div>
      </motion.div>

      {/* Welcome message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl px-10 py-6 shadow-2xl">
              <p
                className="text-white text-2xl font-bold text-center"
                style={{ fontFamily: "Baloo 2, sans-serif" }}
              >
                ✨ Tap anywhere to play! ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual shape component with animations
function ShapeComponent({ shape }: { shape: Shape }) {
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = -300 - Math.random() * 200;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      initial={{
        x: shape.x,
        y: shape.y,
        scale: 0,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        x: shape.x + randomX,
        y: shape.y + randomY,
        scale: [0, 1.2, 1],
        opacity: [0, 1, 0.8, 0],
        rotate: randomRotation,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
      }}
      transition={{
        duration: 4,
        ease: "easeOut",
      }}
      className="absolute pointer-events-none"
      style={{
        width: shape.size,
        height: shape.size,
        left: -shape.size / 2,
        top: -shape.size / 2,
      }}
    >
      {shape.type === "circle" && (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${shape.color} shadow-2xl`}
          style={{
            boxShadow: `0 0 60px ${shape.shadowColor}, 0 0 100px ${shape.shadowColor}`,
          }}
        />
      )}
      
      {shape.type === "star" && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl"
          style={{
            filter: `drop-shadow(0 0 20px rgba(26, 115, 232, 0.8))`,
          }}
        >
          <defs>
            <linearGradient id={`grad-${shape.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A73E8" />
              <stop offset="100%" stopColor="#4A9FF5" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L61 38 L95 38 L68 58 L79 91 L50 71 L21 91 L32 58 L5 38 L39 38 Z"
            fill={`url(#grad-${shape.id})`}
          />
        </svg>
      )}
      
      {shape.type === "heart" && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl"
          style={{
            filter: `drop-shadow(0 0 20px rgba(255, 0, 110, 0.8))`,
          }}
        >
          <defs>
            <linearGradient id={`grad-${shape.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF006E" />
              <stop offset="100%" stopColor="#FF4D94" />
            </linearGradient>
          </defs>
          <path
            d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 15, 40 15 C45 15, 50 20, 50 20 C50 20, 55 15, 60 15 C70 15, 80 25, 80 40 C80 60, 50 85, 50 85 Z"
            fill={`url(#grad-${shape.id})`}
          />
        </svg>
      )}
      
      {shape.type === "bubble" && (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${shape.color} opacity-80`}
          style={{
            boxShadow: `inset 0 0 30px rgba(255, 255, 255, 0.5), 0 0 50px ${shape.glow}`,
            border: "3px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white/60 absolute top-4 left-4" />
          <div className="w-2 h-2 rounded-full bg-white/40 absolute top-6 left-8" />
        </div>
      )}
    </motion.div>
  );
}