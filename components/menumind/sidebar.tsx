"use client";

import { useState } from "react";
import {
  History,
  MessageSquare,
  ScanLine,
  SlidersHorizontal,
  AudioLines,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
};

const NAV: NavItem[] = [
  { label: "Chat", icon: MessageSquare },
  { label: "Scan Menu", icon: ScanLine },
  { label: "Voice Order", icon: AudioLines },
  { label: "My Preferences", icon: SlidersHorizontal },
  { label: "History", icon: History },
];

export function Sidebar() {
  const [active, setActive] = useState("Chat");

  return (
    <nav className="rise-in hidden w-52 flex-none flex-col rounded-2xl glass p-3 md:flex" style={{ animationDelay: "0.15s" }}>
      <span className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Assistant
      </span>
      <ul className="flex flex-col gap-1">
        {NAV.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => setActive(label)}
                className={[
                  "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-primary/15 text-foreground amber-glow"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                ].join(" ")}
              >
                <Icon
                  className={isActive ? "h-[18px] w-[18px] text-primary" : "h-[18px] w-[18px]"}
                  strokeWidth={2}
                />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_color-mix(in_oklch,var(--primary)_60%,transparent)]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto rounded-xl border border-border/60 bg-background/40 p-3">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Powered by your MenuMind kitchen intelligence engine.
        </p>
      </div>
    </nav>
  );
}
