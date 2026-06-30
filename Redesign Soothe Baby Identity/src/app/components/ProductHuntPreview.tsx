import { motion } from "motion/react";
import { AppIcon } from "./AppIcon";

/**
 * ProductHuntPreview - A showcase component demonstrating the app's visual identity
 * This demonstrates how the app would appear in Product Hunt galleries and marketing materials
 */
export function ProductHuntPreview() {
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "Baloo 2, sans-serif" }}
          >
            Product Hunt Launch Assets
          </h2>
          <p className="text-gray-600" style={{ fontFamily: "Fredoka, sans-serif" }}>
            Consistent brand identity across all touchpoints
          </p>
        </div>

        {/* Gallery Thumbnail Mockup */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "Baloo 2, sans-serif" }}>
            Gallery Thumbnail (Instantly Recognizable)
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
            <div className="flex items-center gap-6">
              <AppIcon size={80} />
              <div>
                <h4
                  className="text-2xl font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "Baloo 2, sans-serif" }}
                >
                  Soothe Baby
                </h4>
                <p className="text-gray-600" style={{ fontFamily: "Fredoka, sans-serif" }}>
                  Sensory touch app for infants 0-2yo
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full text-sm font-medium">
                    Baby & Parenting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Icon Showcase */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "Baloo 2, sans-serif" }}>
            App Icon (Multiple Sizes)
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-6 flex-wrap">
            <div className="text-center">
              <AppIcon size={120} />
              <p className="mt-2 text-sm text-gray-600">120px</p>
            </div>
            <div className="text-center">
              <AppIcon size={80} />
              <p className="mt-2 text-sm text-gray-600">80px</p>
            </div>
            <div className="text-center">
              <AppIcon size={60} />
              <p className="mt-2 text-sm text-gray-600">60px</p>
            </div>
            <div className="text-center">
              <AppIcon size={40} />
              <p className="mt-2 text-sm text-gray-600">40px</p>
            </div>
          </div>
        </div>

        {/* Brand Color Palette */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "Baloo 2, sans-serif" }}>
            Brand Color System
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="w-full h-24 rounded-xl bg-[#1A73E8] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Brand Blue</p>
                <p className="text-sm text-gray-600 font-mono">#1A73E8</p>
              </div>
              <div>
                <div className="w-full h-24 rounded-xl bg-[#7B2CBF] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Purple</p>
                <p className="text-sm text-gray-600 font-mono">#7B2CBF</p>
              </div>
              <div>
                <div className="w-full h-24 rounded-xl bg-[#FF006E] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Pink</p>
                <p className="text-sm text-gray-600 font-mono">#FF006E</p>
              </div>
              <div>
                <div className="w-full h-24 rounded-xl bg-[#FFD60A] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Yellow</p>
                <p className="text-sm text-gray-600 font-mono">#FFD60A</p>
              </div>
              <div>
                <div className="w-full h-24 rounded-xl bg-[#06FFA5] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Mint</p>
                <p className="text-sm text-gray-600 font-mono">#06FFA5</p>
              </div>
              <div>
                <div className="w-full h-24 rounded-xl bg-[#FCA311] shadow-lg mb-2"></div>
                <p className="font-semibold text-gray-900">Orange</p>
                <p className="text-sm text-gray-600 font-mono">#FCA311</p>
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "Baloo 2, sans-serif" }}>
            Typography System
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Headings - Baloo 2</p>
              <h1
                className="text-5xl font-bold text-[#1A73E8]"
                style={{ fontFamily: "Baloo 2, sans-serif" }}
              >
                Soothe Baby
              </h1>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Body - Fredoka</p>
              <p
                className="text-lg text-gray-700"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                A premium sensory experience designed for infant development
              </p>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "Baloo 2, sans-serif" }}>
            Design Principles
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                  ✨ Calm Joy
                </h4>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "Fredoka, sans-serif" }}>
                  Premium but playful, safe-feeling for parents while delightful for babies
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                  🎨 Rich Saturation
                </h4>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "Fredoka, sans-serif" }}>
                  Vibrant gradients with strong color saturation for visual engagement
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                  💎 Glassmorphism
                </h4>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "Fredoka, sans-serif" }}>
                  Soft glass effects for UI chrome with backdrop blur and subtle borders
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                  🌟 Confident Typography
                </h4>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "Fredoka, sans-serif" }}>
                  Rounded, friendly fonts that feel both premium and approachable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
