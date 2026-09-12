"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SceneBackground } from "./scene-background";
import { TopBar } from "./top-bar";
import { Sidebar } from "./sidebar";
import { AssistantPanel } from "./assistant-panel";
import { DishCard } from "./dish-card";

export function MenumindExperience() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    // Normalize to -1..1 from the center of the viewport
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPos({ x, y }));
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMove}
      className="relative h-screen w-screen overflow-hidden bg-background noise-overlay"
    >
      <SceneBackground mx={pos.x} my={pos.y} />

      {/* Foreground UI */}
      <div className="relative z-10 flex h-full flex-col gap-4 p-4 lg:p-6">
        <TopBar />
        <div
          className="flex min-h-0 flex-1 items-stretch gap-4 will-change-transform lg:gap-6"
          style={{
            transform: `translate3d(${pos.x * 6}px, ${pos.y * 5}px, 0)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          <Sidebar />
          <AssistantPanel />
          <DishCard mx={pos.x} my={pos.y} />
        </div>
      </div>
    </div>
  );
}
