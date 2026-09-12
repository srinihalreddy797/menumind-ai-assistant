"use client";

type SceneBackgroundProps = {
  mx: number;
  my: number;
};

const PARTICLES = [
  { left: "12%", top: "22%", size: 3, delay: "0s", dur: "6s" },
  { left: "28%", top: "68%", size: 2, delay: "1.2s", dur: "7.5s" },
  { left: "44%", top: "34%", size: 4, delay: "0.6s", dur: "8s" },
  { left: "63%", top: "58%", size: 2, delay: "2s", dur: "6.8s" },
  { left: "78%", top: "26%", size: 3, delay: "0.3s", dur: "9s" },
  { left: "88%", top: "72%", size: 2, delay: "1.8s", dur: "7s" },
  { left: "54%", top: "80%", size: 3, delay: "1s", dur: "8.4s" },
  { left: "20%", top: "45%", size: 2, delay: "2.6s", dur: "6.2s" },
  { left: "70%", top: "42%", size: 2, delay: "3.1s", dur: "7.7s" },
  { left: "36%", top: "18%", size: 2, delay: "0.9s", dur: "8.8s" },
];

export function SceneBackground({ mx, my }: SceneBackgroundProps) {
  return (
    <div className="scene-fade-in pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep back layer — moves the least, giving the room its parallax depth */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${mx * -10}px, ${my * -8}px, 0) scale(1.14)`,
          backgroundImage: "url(/restaurant-scene.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.6s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Near foreground layer — same scene, slightly larger & more parallax, adds physical depth */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen will-change-transform"
        style={{
          transform: `translate3d(${mx * -26}px, ${my * -20}px, 0) scale(1.22)`,
          backgroundImage: "url(/restaurant-scene.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(120% 100% at 50% 60%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 60%, black 20%, transparent 75%)",
          transition: "transform 0.6s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Depth + readability gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/70" />

      {/* Cinematic vignette for focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 28%, color-mix(in oklch, var(--background) 88%, transparent) 100%)",
        }}
      />

      {/* Warm light shaft from the top — shifts subtly with the mouse (lighting response) */}
      <div
        className="absolute inset-x-0 -top-1/3 h-[90vh] will-change-transform"
        style={{
          transform: `translate3d(${mx * 30}px, 0, 0)`,
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 42%, color-mix(in oklch, var(--primary) 16%, transparent) 50%, transparent 58%)",
          filter: "blur(30px)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Warm amber glow bloom (candle/pendant ambiance) */}
      <div
        className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 38%, transparent), transparent 70%)",
          transform: `translate3d(calc(-50% + ${mx * 24}px), ${my * 20}px, 0)`,
        }}
      />

      {/* Deep orange floor bounce light */}
      <div
        className="absolute -bottom-1/4 left-1/2 h-[45vh] w-[90vw] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent) 30%, transparent), transparent 72%)",
          transform: `translate3d(calc(-50% + ${mx * -14}px), ${my * -8}px, 0)`,
        }}
      />

      {/* Floating light particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
            background: "color-mix(in oklch, var(--primary) 80%, white)",
            boxShadow: "0 0 10px 2px color-mix(in oklch, var(--primary) 60%, transparent)",
            opacity: 0.55,
            transform: `translate3d(${mx * (6 + (i % 3) * 6)}px, ${my * (5 + (i % 2) * 5)}px, 0)`,
            transition: "transform 0.5s ease-out",
          }}
        />
      ))}
    </div>
  );
}
