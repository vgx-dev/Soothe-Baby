import { Twitter, Instagram, ExternalLink } from "lucide-react";

// ── Keyframe animations ─────────────────────────────────────
const Styles = () => (
  <style>{`
    @keyframes floatPhone {
      0%, 100% { transform: translateY(0px) rotate(-4deg); }
      50% { transform: translateY(-18px) rotate(-4deg); }
    }
    @keyframes floatA {
      0%, 100% { transform: translateY(0px) rotate(10deg); }
      50% { transform: translateY(-14px) rotate(10deg); }
    }
    @keyframes floatB {
      0%, 100% { transform: translateY(0px) rotate(-6deg); }
      50% { transform: translateY(-10px) rotate(-6deg); }
    }
    @keyframes floatC {
      0%, 100% { transform: translateY(0px) rotate(18deg); }
      50% { transform: translateY(-16px) rotate(18deg); }
    }
    @keyframes floatD {
      0%, 100% { transform: translateY(0px) rotate(-12deg); }
      50% { transform: translateY(-12px) rotate(-12deg); }
    }
    .anim-phone { animation: floatPhone 5s ease-in-out infinite; }
    .anim-a { animation: floatA 3.6s ease-in-out infinite; }
    .anim-b { animation: floatB 4.3s ease-in-out infinite 0.8s; }
    .anim-c { animation: floatC 3.9s ease-in-out infinite 1.4s; }
    .anim-d { animation: floatD 4.7s ease-in-out infinite 0.4s; }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { display: none; }
  `}</style>
);

// ── Decorative SVG shapes ────────────────────────────────────
function StarSVG({ size = 32, color }: { size?: number; color: string }) {
  const r = size / 2;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const rad = i % 2 === 0 ? r - 1 : (r - 1) * 0.42;
    return `${r + rad * Math.cos(a)},${r + rad * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

function TriangleSVG({ size = 32, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}>
      <polygon points={`${size / 2},3 ${size - 3},${size - 3} 3,${size - 3}`} fill={color} />
    </svg>
  );
}

function CircleSVG({ size = 32, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill={color} />
    </svg>
  );
}

function SquareSVG({ size = 32, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}>
      <rect x="3" y="3" width={size - 6} height={size - 6} rx="6" fill={color} />
    </svg>
  );
}

// ── Phone mockup screens ─────────────────────────────────────
function StartScreen() {
  return (
    <div className="w-full h-full bg-[#A4C2F4] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      <div className="absolute top-6 left-5 anim-a"><StarSVG color="#FFD250" size={36} /></div>
      <div className="absolute top-10 right-6 anim-b"><CircleSVG color="#50BEFF" size={28} /></div>
      <div className="absolute bottom-14 right-4 anim-c"><TriangleSVG color="#78E16E" size={30} /></div>
      <div className="absolute bottom-8 left-6 anim-d"><SquareSVG color="#FF6E8C" size={24} /></div>
      <p className="font-black text-[#333] text-base text-center px-4 leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Tap to begin ✨
      </p>
    </div>
  );
}

function PlayingScreen() {
  return (
    <div className="w-full h-full bg-[#A4C2F4] relative overflow-hidden">
      <div className="absolute" style={{ top: "12%", left: "12%" }}>
        <StarSVG color="#FFD250" size={46} />
      </div>
      <div className="absolute" style={{ top: "28%", right: "10%" }}>
        <CircleSVG color="#50BEFF" size={40} />
      </div>
      <div className="absolute" style={{ top: "50%", left: "18%" }}>
        <TriangleSVG color="#78E16E" size={38} />
      </div>
      <div className="absolute" style={{ top: "55%", right: "20%" }}>
        <SquareSVG color="#FF6E8C" size={34} />
      </div>
      <div className="absolute" style={{ bottom: "22%", left: "35%" }}>
        <StarSVG color="#B982FF" size={30} />
      </div>
      {/* Confetti bursts */}
      {[
        { x: "48%", y: "22%", c: "#FFA53C", s: 10 },
        { x: "28%", y: "44%", c: "#50E1D2", s: 8 },
        { x: "65%", y: "62%", c: "#FFD250", s: 9 },
        { x: "20%", y: "72%", c: "#FF6E8C", s: 7 },
        { x: "72%", y: "38%", c: "#B982FF", s: 8 },
      ].map((d, i) => (
        <div key={i} className="absolute rounded-full opacity-90" style={{ left: d.x, top: d.y, width: d.s, height: d.s, background: d.c }} />
      ))}
    </div>
  );
}

function MenuScreen() {
  return (
    <div className="w-full h-full bg-[#A4C2F4] relative overflow-hidden">
      <div className="absolute top-5 left-4 opacity-60"><StarSVG color="#FFD250" size={32} /></div>
      <div className="absolute bottom-16 right-4 opacity-60"><CircleSVG color="#50BEFF" size={28} /></div>
      <div
        className="absolute rounded-3xl flex flex-col items-center justify-center gap-2.5 px-3 py-4"
        style={{ inset: "14px", top: "22%", bottom: "18%", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)" }}
      >
        <p className="font-black text-[#333] text-sm mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Parent Menu</p>
        <button className="w-full py-2 rounded-xl bg-[#E8F0FE] text-[#1A73E8] font-bold text-xs">Reset Game</button>
        <button className="w-full py-2 rounded-xl bg-[#E8F0FE] text-[#1A73E8] font-bold text-xs">Sound: ON</button>
        <button className="w-full py-2 rounded-xl bg-[#1A73E8] text-white font-bold text-xs">Close</button>
      </div>
    </div>
  );
}

function PhoneMockup({ type, rotation = 0 }: { type: "start" | "playing" | "menu"; rotation?: number }) {
  const W = 192;
  const H = 400;
  const Screen = type === "start" ? StartScreen : type === "playing" ? PlayingScreen : MenuScreen;
  return (
    <div style={{ transform: `rotate(${rotation}deg)`, width: W, height: H, position: "relative", flexShrink: 0 }}>
      {/* Shadow beneath */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full opacity-20 blur-md bg-gray-900"
        style={{ width: 120, height: 20 }}
      />
      {/* Frame */}
      <div
        className="absolute inset-0 rounded-[36px] bg-gray-900"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}
      />
      {/* Screen */}
      <div
        className="absolute overflow-hidden rounded-[30px]"
        style={{ top: 28, bottom: 20, left: 6, right: 6 }}
      >
        <Screen />
      </div>
      {/* Notch */}
      <div
        className="absolute bg-gray-900 rounded-full"
        style={{ width: 64, height: 16, top: 8, left: "50%", transform: "translateX(-50%)" }}
      />
      {/* Home bar */}
      <div
        className="absolute bg-gray-600 rounded-full"
        style={{ width: 52, height: 4, bottom: 6, left: "50%", transform: "translateX(-50%)" }}
      />
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8F0FE]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#A4C2F4] flex items-center justify-center">
            <StarSVG color="#1A73E8" size={20} />
          </div>
          <span className="font-black text-[#333] text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Soothe Baby
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="hidden md:block text-[#5F6368] hover:text-[#333] text-sm font-medium transition-colors">Features</a>
          <a href="#how" className="hidden md:block text-[#5F6368] hover:text-[#333] text-sm font-medium transition-colors">How it works</a>
          <button className="bg-[#1A73E8] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#1557b0] transition-colors shadow-sm">
            Try it free
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="pt-16 min-h-screen flex items-center"
      style={{ background: "linear-gradient(140deg, #F4F8FF 0%, #ffffff 60%)" }}
    >
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center py-20 w-full">
        {/* Text content */}
        <div>
          <div
            className="inline-flex items-center bg-[#E8F0FE] text-[#1A73E8] text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest"
          >
            New on Product Hunt 🎉
          </div>
          <h1
            className="text-5xl lg:text-[3.75rem] font-black text-[#333] leading-[1.1] mb-5"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Calm your baby<br />in one tap.
          </h1>
          <p className="text-xl text-[#5F6368] mb-8 leading-relaxed max-w-lg">
            {"A simple, soothing touch game that turns screen time into calm time — for babies 3 months to 2 years."}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-[#1A73E8] text-white font-black px-8 py-4 rounded-xl text-lg hover:bg-[#1557b0] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Try it free
            </button>
            <button className="border-2 border-[#1A73E8] text-[#1A73E8] font-black px-8 py-4 rounded-xl text-lg hover:bg-[#E8F0FE] transition-colors">
              Watch demo
            </button>
          </div>
          {/* Product Hunt badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-white border border-[#E8F0FE] rounded-xl px-4 py-2.5 shadow-sm">
              <div className="w-9 h-9 bg-[#DA552F] rounded-lg flex items-center justify-center text-white text-xs font-black">
                PH
              </div>
              <div>
                <p className="text-[10px] text-[#5F6368] leading-none font-medium">Featured on</p>
                <p className="text-sm font-black text-[#333] leading-tight">Product Hunt</p>
              </div>
            </div>
            <p className="text-sm text-[#5F6368]">Loved by parents on Product Hunt 🎉</p>
          </div>
        </div>

        {/* Phone mockup side */}
        <div className="relative flex justify-center items-center" style={{ height: 520 }}>
          {/* Background blobs */}
          <div className="absolute rounded-full blur-3xl opacity-30 bg-[#FFD250]" style={{ width: 220, height: 220, top: "8%", right: "8%" }} />
          <div className="absolute rounded-full blur-3xl opacity-25 bg-[#FF6E8C]" style={{ width: 160, height: 160, bottom: "10%", left: "2%" }} />
          <div className="absolute rounded-full blur-3xl opacity-25 bg-[#50BEFF]" style={{ width: 140, height: 140, top: "35%", left: "12%" }} />

          {/* Floating shapes */}
          <div className="absolute anim-a" style={{ top: "6%", left: "6%" }}>
            <StarSVG color="#FFD250" size={52} />
          </div>
          <div className="absolute anim-b" style={{ top: "18%", right: "2%" }}>
            <CircleSVG color="#50BEFF" size={40} />
          </div>
          <div className="absolute anim-c" style={{ bottom: "22%", right: "4%" }}>
            <TriangleSVG color="#78E16E" size={44} />
          </div>
          <div className="absolute anim-d" style={{ bottom: "8%", left: "8%" }}>
            <SquareSVG color="#FF6E8C" size={36} />
          </div>
          <div className="absolute anim-a" style={{ top: "60%", left: "0%" }}>
            <StarSVG color="#B982FF" size={32} />
          </div>

          {/* Phone */}
          <div className="anim-phone">
            <PhoneMockup type="playing" rotation={-4} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Problem / Empathy ────────────────────────────────────────
function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <div className="inline-block bg-[#E8F0FE] text-[#1A73E8] text-xs font-black tracking-widest uppercase px-5 py-2 rounded-full mb-6">
          Why Soothe Baby
        </div>
        <h2
          className="text-4xl font-black text-[#333] mb-6 leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {"Fussy moments happen. You shouldn't need a screen full of ads to fix them."}
        </h2>
        <p className="text-xl text-[#5F6368] leading-relaxed max-w-xl mx-auto">
          {"Soothe Baby is ad-free, distraction-free, and designed with pediatric sensory principles in mind — just gentle motion and color, nothing else."}
        </p>
      </div>
    </section>
  );
}

// ── Showcase ─────────────────────────────────────────────────
function Showcase() {
  const mockups: { type: "start" | "playing" | "menu"; rotation: number; caption: string }[] = [
    { type: "start", rotation: -6, caption: "Gentle start" },
    { type: "playing", rotation: 0, caption: "Endless tapping fun" },
    { type: "menu", rotation: 6, caption: "Parental controls built in" },
  ];

  return (
    <section className="py-24 bg-[#F4F8FF]">
      <div className="max-w-5xl mx-auto px-5">
        <h2
          className="text-4xl font-black text-[#333] text-center mb-16"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          See it in action
        </h2>
        <div className="flex items-end justify-center">
          {mockups.map(({ type, rotation, caption }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-6"
              style={{ zIndex: i === 1 ? 3 : i === 0 ? 2 : 1, marginLeft: i > 0 ? -28 : 0 }}
            >
              <PhoneMockup type={type} rotation={rotation} />
              <p className="text-[#5F6368] text-sm font-medium text-center">{caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────
function Features() {
  const items = [
    {
      icon: <StarSVG color="#FFD250" size={36} />,
      title: "No ads, ever",
      body: "A completely closed, distraction-free experience. Just baby and shapes.",
    },
    {
      icon: <CircleSVG color="#50BEFF" size={36} />,
      title: "Parent lock PIN",
      body: "A simple 4-digit PIN keeps settings safe from curious little hands.",
    },
    {
      icon: <TriangleSVG color="#78E16E" size={36} />,
      title: "Sensory-friendly design",
      body: "Soft colors, gentle physics, and calm sound designed around infant attention spans.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <h2
          className="text-4xl font-black text-[#333] text-center mb-16"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Built for babies. Trusted by parents.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map(({ icon, title, body }, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#E8F0FE] flex items-center justify-center shadow-sm">
                {icon}
              </div>
              <h3
                className="text-xl font-black text-[#333]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-[#5F6368] leading-relaxed text-base">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: 1, title: "Open the app", desc: "Hand your phone to your baby, no setup needed." },
    {
      n: 2,
      title: "They tap, shapes bounce",
      desc: "Stars, circles, triangles burst into color and motion with every touch.",
    },
    {
      n: 3,
      title: "Lock it down",
      desc: "Use the PIN-protected parent menu to reset or mute anytime.",
    },
  ];

  return (
    <section id="how" className="py-24 bg-[#A4C2F4]">
      <div className="max-w-5xl mx-auto px-5">
        <h2
          className="text-4xl font-black text-white text-center mb-16"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Three taps to calm
        </h2>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute h-px border-dashed border-t-2 border-white/40"
            style={{ top: 28, left: "calc(16.7% + 28px)", right: "calc(16.7% + 28px)" }}
          />
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col items-center text-center gap-4 flex-1 relative">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center font-black text-xl text-[#1A73E8] shadow-md z-10">
                {n}
              </div>
              <h3
                className="text-lg font-black text-white"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-white/85 text-sm leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Social Proof ─────────────────────────────────────────────
function SocialProof() {
  const testimonials = [
    {
      quote: "My 8-month-old is obsessed! It's the only screen time I don't feel guilty about.",
      name: "Aya T.",
      role: "Mom of a 9-month-old",
      avatarBg: "#FFD250",
    },
    {
      quote: "Clean, simple, no ads. Finally an app that is actually for babies and not for advertisers.",
      name: "James K.",
      role: "Dad of twin 1-year-olds",
      avatarBg: "#50BEFF",
    },
    {
      quote: "My daughter calms down in seconds. I hand her the phone and the fussing just stops.",
      name: "Priya M.",
      role: "Mom of a 6-month-old",
      avatarBg: "#78E16E",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 text-center">
        {/* PH Badge */}
        <div className="inline-flex items-center gap-3 border border-[#E8F0FE] rounded-2xl px-6 py-3 shadow-sm mb-8">
          <div className="w-10 h-10 bg-[#DA552F] rounded-xl flex items-center justify-center text-white font-black text-sm">
            PH
          </div>
          <div className="text-left">
            <p className="text-xs text-[#5F6368]">Featured on</p>
            <p className="font-black text-[#333]">Product Hunt</p>
          </div>
          <div className="text-[#FFD250] font-bold ml-1">▲ 250+</div>
        </div>

        <h2
          className="text-3xl font-black text-[#333] mb-12"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Join parents already loving Soothe Baby
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, avatarBg }, i) => {
            const initials = name.split(" ").map((w) => w[0]).join("");
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-left border border-[#F4F8FF]"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }, (_, k) => (
                    <span key={k} className="text-[#FFD250] text-xl">★</span>
                  ))}
                </div>
                <p className="text-[#333] italic leading-relaxed mb-5 text-sm">{`"${quote}"`}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                    style={{ background: avatarBg }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#333] text-sm">{name}</p>
                    <p className="text-[#5F6368] text-xs">{role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A73E8 0%, #4A90F0 100%)" }}
    >
      {/* Decorative outline shapes */}
      <div className="absolute anim-a opacity-15" style={{ top: 24, left: 40 }}>
        <StarSVG color="white" size={80} />
      </div>
      <div className="absolute anim-b opacity-15" style={{ top: 40, right: 80 }}>
        <CircleSVG color="white" size={64} />
      </div>
      <div className="absolute anim-c opacity-15" style={{ bottom: 32, left: 100 }}>
        <TriangleSVG color="white" size={60} />
      </div>
      <div className="absolute anim-d opacity-15" style={{ bottom: 24, right: 40 }}>
        <StarSVG color="white" size={52} />
      </div>

      <div className="max-w-2xl mx-auto px-5 text-center relative z-10">
        <h2
          className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Ready for calmer moments?
        </h2>
        <p className="text-xl text-white/85 mb-10">
          Free to try. No sign-up required to start playing.
        </p>
        <button className="bg-white text-[#1A73E8] font-black text-lg px-10 py-4 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
          Try Soothe Baby now
        </button>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#A4C2F4] flex items-center justify-center">
                <StarSVG color="#1A73E8" size={18} />
              </div>
              <span className="font-black text-white text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Soothe Baby
              </span>
            </div>
            <p className="text-white/50 text-sm">Calm your baby in one tap.</p>
          </div>

          <div>
            <p className="font-bold text-white text-sm mb-3">Product</p>
            <ul className="space-y-2">
              {["Features", "How it works", "FAQ"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white text-sm mb-3">Company</p>
            <ul className="space-y-2">
              {["About", "Contact", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 Soothe Baby. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Styles />
      <Nav />
      <Hero />
      <Problem />
      <Showcase />
      <Features />
      <HowItWorks />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
}
