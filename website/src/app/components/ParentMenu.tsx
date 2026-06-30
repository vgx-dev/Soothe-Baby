import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, VolumeX, ArrowLeft } from "lucide-react";

interface ParentMenuProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function ParentMenu({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
}: ParentMenuProps) {
  const handleBackToWebsite = () => {
    // Leave fullscreen (if the game entered it) before returning to the site.
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.href = "/";
  };

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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white border border-[#E8F0FE] rounded-3xl shadow-2xl p-8 pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-3xl font-black text-[#333]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Parent Menu
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#F4F8FF] hover:bg-[#E8F0FE] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-[#5F6368]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* Sound Toggle */}
                <div className="bg-[#F4F8FF] rounded-2xl p-4 border border-[#E8F0FE]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-6 h-6 text-[#1A73E8]" strokeWidth={2.5} />
                      ) : (
                        <VolumeX className="w-6 h-6 text-[#5F6368]" strokeWidth={2.5} />
                      )}
                      <div>
                        <h3
                          className="text-lg font-bold text-[#333]"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        >
                          Sound
                        </h3>
                        <p
                          className="text-sm text-[#5F6368]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {soundEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onToggleSound}
                      className={`w-14 h-8 rounded-full transition-colors relative ${
                        soundEnabled ? "bg-[#1A73E8]" : "bg-[#A4C2F4]/50"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        animate={{
                          left: soundEnabled ? "calc(100% - 28px)" : "4px",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

                {/* Back to Website */}
                <button
                  onClick={handleBackToWebsite}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A73E8] text-white font-bold px-6 py-4 rounded-2xl hover:bg-[#1557b0] transition-colors shadow-sm"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                  Back to Website
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-[#E8F0FE]">
                <p
                  className="text-center text-[#5F6368]/70 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
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
