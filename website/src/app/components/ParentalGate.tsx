import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Delete } from "lucide-react";

const PARENT_PIN = "1234";
const PIN_LENGTH = 4;

interface ParentalGateProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ParentalGate({ isOpen, onSuccess, onCancel }: ParentalGateProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const reset = () => {
    setPin("");
    setError(false);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH || error) return;

    const next = pin + digit;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      if (next === PARENT_PIN) {
        reset();
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setPin("");
          setError(false);
        }, 450);
      }
    }
  };

  const handleBackspace = () => {
    if (error) return;
    setPin((prev) => prev.slice(0, -1));
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
            onClick={handleCancel}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <motion.div
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xs bg-white border border-[#E8F0FE] rounded-3xl shadow-2xl p-8 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="text-2xl font-black text-[#333]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Parents Only
                </h2>
                <button
                  onClick={handleCancel}
                  className="w-10 h-10 rounded-full bg-[#F4F8FF] hover:bg-[#E8F0FE] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-[#5F6368]" strokeWidth={2.5} />
                </button>
              </div>
              <p
                className="text-sm text-[#5F6368] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Enter the 4-digit PIN to continue.
              </p>

              {/* PIN dots */}
              <div className="flex justify-center gap-4 mb-6">
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      error
                        ? "bg-[#FF006E] border-[#FF006E]"
                        : i < pin.length
                        ? "bg-[#1A73E8] border-[#1A73E8]"
                        : "border-[#A4C2F4]"
                    }`}
                  />
                ))}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handleDigit(digit)}
                    className="h-14 rounded-2xl bg-[#F4F8FF] hover:bg-[#E8F0FE] text-xl font-bold text-[#333] transition-colors"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {digit}
                  </button>
                ))}
                <button
                  onClick={handleCancel}
                  className="h-14 rounded-2xl bg-[#F4F8FF] hover:bg-[#E8F0FE] flex items-center justify-center text-[#5F6368] transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => handleDigit("0")}
                  className="h-14 rounded-2xl bg-[#F4F8FF] hover:bg-[#E8F0FE] text-xl font-bold text-[#333] transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="h-14 rounded-2xl bg-[#F4F8FF] hover:bg-[#E8F0FE] flex items-center justify-center text-[#5F6368] transition-colors"
                >
                  <Delete className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
