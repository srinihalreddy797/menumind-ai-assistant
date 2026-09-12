"use client";

import Image from "next/image";
import { Flame, HeartPulse, Nut } from "lucide-react";
import type { DishInfo } from "@/lib/menumind/types";

type DishCardProps = {
  mx: number;
  my: number;
  /** Defaults to a real MenuMind menu item; later populated from the backend. */
  dish?: DishInfo;
};

const DEFAULT_DISH: DishInfo = {
  name: "Chicken Chettinad",
  tagline: "Fiery South Indian classic",
  category: "Non-Veg",
  price: 380,
  spiceLevel: 8,
  healthScore: 7,
  allergens: ["Coconut"],
  image: "/chicken-chettinad.png",
};

export function DishCard({ mx, my, dish = DEFAULT_DISH }: DishCardProps) {
  const isVeg = dish.category === "Veg";

  return (
    <aside
      className="rise-in relative hidden w-64 flex-none flex-col justify-end md:flex"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Floating 3D dish, hovering just above the card. Parallax layer. */}
      <div
        className="dish-appear pointer-events-none absolute bottom-[196px] left-1/2 z-10 will-change-transform"
        style={{
          transform: `translate3d(calc(-50% + ${mx * 30}px), ${my * 24}px, 0)`,
          perspective: "700px",
        }}
      >
        {/* Continuous 3D bob + subtle rotation */}
        <div className="dish-orbit relative">
          {/* Warm rim light behind the plate */}
          <div
            className="absolute inset-x-4 top-2 bottom-10 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklch, var(--primary) 45%, transparent)" }}
          />

          <Image
            src={dish.image ?? "/chicken-chettinad.png"}
            alt={`A realistic plated serving of ${dish.name}`}
            width={300}
            height={300}
            priority
            className="relative z-10 h-auto w-64 drop-shadow-[0_30px_45px_rgba(0,0,0,0.75)]"
            style={{
              WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 54%, transparent 72%)",
              maskImage: "radial-gradient(circle at 50% 45%, black 54%, transparent 72%)",
            }}
          />

          {/* Table-surface reflection under the plate */}
          <Image
            src={dish.image ?? "/chicken-chettinad.png"}
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="absolute inset-x-0 top-[62%] mx-auto h-auto w-64 scale-y-[-1] opacity-25 blur-[2px]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 55%)",
              maskImage: "linear-gradient(to bottom, black, transparent 55%)",
            }}
          />

          {/* Soft contact shadow on the table */}
          <div
            className="absolute inset-x-10 bottom-6 h-8 rounded-[50%] blur-xl"
            style={{ background: "rgba(0,0,0,0.6)" }}
          />
        </div>
      </div>

      {/* Intelligence card */}
      <div className="relative rounded-2xl glass-strong p-4">
        <div className="flex items-center justify-between">
          <span
            className={[
              "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
              isVeg
                ? "bg-accent/20 text-foreground"
                : "bg-destructive/20 text-destructive-foreground",
            ].join(" ")}
          >
            {dish.category}
          </span>
          <span className="text-xl font-semibold text-foreground">
            <span className="mr-0.5 text-base font-medium text-muted-foreground">Rs</span>
            {dish.price}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-2xl leading-tight text-foreground amber-text-glow">
          {dish.name}
        </h3>
        {dish.tagline && (
          <p className="mt-0.5 text-xs text-muted-foreground">{dish.tagline}</p>
        )}

        <div className="mt-4 space-y-3">
          <Stat
            icon={<Flame className="h-4 w-4 text-primary" />}
            label="Spice Level"
            value={dish.spiceLevel}
            display={`${dish.spiceLevel}/10`}
            tone="var(--primary)"
          />
          <Stat
            icon={<HeartPulse className="h-4 w-4 text-primary" />}
            label="Health Score"
            value={dish.healthScore}
            display={`${dish.healthScore}/10`}
            tone="var(--accent)"
          />
        </div>

        {dish.allergens && dish.allergens.length > 0 && (
          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3">
            <Nut className="h-4 w-4 flex-none text-primary/80" />
            <span className="text-xs text-muted-foreground">
              Allergen:{" "}
              <span className="font-medium text-foreground">
                {dish.allergens.join(", ")}
              </span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

function Stat({
  icon,
  label,
  value,
  display,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  display: string;
  tone: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="font-semibold text-foreground">{display}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value * 10}%`,
            background: `linear-gradient(90deg, color-mix(in oklch, ${tone} 60%, transparent), ${tone})`,
            boxShadow: `0 0 12px -2px ${tone}`,
          }}
        />
      </div>
    </div>
  );
}
