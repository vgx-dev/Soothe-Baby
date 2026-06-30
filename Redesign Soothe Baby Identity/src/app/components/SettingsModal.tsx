import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, VolumeX, Palette } from "lucide-react";
import { GlassButton } from "./GlassButton";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
}: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-8 pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "Baloo 2, sans-serif" }}
                >
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                </button>
              </div>

              {/* Settings Options */}
              <div className="space-y-4">
                {/* Sound Toggle */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                      ) : (
                        <VolumeX className="w-6 h-6 text-white" strokeWidth={2.5} />
                      )}
                      <div>
                        <h3
                          className="text-lg font-semibold text-white"
                          style={{ fontFamily: "Baloo 2, sans-serif" }}
                        >
                          Sound
                        </h3>
                        <p
                          className="text-sm text-white/70"
                          style={{ fontFamily: "Fredoka, sans-serif" }}
                        >
                          {soundEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onToggleSound}
                      className={`w-14 h-8 rounded-full transition-colors relative ${
                        soundEnabled
                          ? "bg-gradient-to-r from-[#1A73E8] to-[#4A9FF5]"
                          : "bg-white/20"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{
                          left: soundEnabled ? "calc(100% - 28px)" : "4px",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Palette className="w-6 h-6 text-white flex-shrink-0" strokeWidth={2.5} />
                    <div>
                      <h3
                        className="text-lg font-semibold text-white mb-1"
                        style={{ fontFamily: "Baloo 2, sans-serif" }}
                      >
                        Visual Theme
                      </h3>
                      <p
                        className="text-sm text-white/70"
                        style={{ fontFamily: "Fredoka, sans-serif" }}
                      >
                        Rich gradients and soft glows designed for infant visual development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p
                  className="text-center text-white/60 text-sm"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  Designed with ❤️ for ages 0-2 years
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
