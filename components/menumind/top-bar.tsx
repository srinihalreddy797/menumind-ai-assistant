"use client";

import { ChevronDown, Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex flex-none items-start justify-between gap-4">
      {/* Logo + tagline */}
      <div className="rise-in">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 amber-glow pulse-ring">
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={2} />
          </span>
          <div className="leading-none">
            <h1 className="font-display text-2xl text-foreground amber-text-glow">
              MenuMind <span className="text-primary">AI</span>
            </h1>
          </div>
        </div>
        <p className="mt-2 pl-0.5 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Understand <span className="text-primary/80">•</span> Choose{" "}
          <span className="text-primary/80">•</span> Enjoy
        </p>
      </div>

      {/* Profile pill */}
      <button
        type="button"
        className="rise-in flex items-center gap-2.5 rounded-full glass px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40"
        style={{ animationDelay: "0.1s" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/25 text-[11px] font-semibold text-primary">
          G
        </span>
        <span className="font-medium">Guest</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
    </header>
  );
}
