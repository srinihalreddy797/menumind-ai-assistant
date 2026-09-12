import { Sparkles } from "lucide-react";

export function LoadingBubble() {
  return (
    <div className="flex items-end gap-2.5">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/15 text-primary amber-glow pulse-ring relative">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary/90">MenuMind is thinking</span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary"
                style={{
                  animation: "menumind-dot 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
