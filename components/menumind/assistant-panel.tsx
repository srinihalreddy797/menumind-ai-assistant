"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  ArrowUp,
  HeartPulse,
  Mic,
  Search,
  ShieldAlert,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { sendChatMessage } from "@/lib/menumind/api";
import type { ChatMessage } from "@/lib/menumind/types";
import { MessageBubble } from "./message-bubble";
import { LoadingBubble } from "./loading-bubble";

type Feature = {
  title: string;
  sub: string;
  icon: LucideIcon;
  prompt: string;
};

const FEATURES: Feature[] = [
  { title: "Explain a dish", sub: "Ingredients, taste, origin...", icon: Utensils, prompt: "Explain the dish Chicken Chettinad." },
  { title: "Find similar dishes", sub: "Looking for something else?", icon: Search, prompt: "What vegetarian dishes are spicy but not too heavy?" },
  { title: "Check for allergens", sub: "Avoid allergens and stay safe", icon: ShieldAlert, prompt: "Which dishes are safe if I am allergic to peanuts?" },
  { title: "Health score", sub: "Nutrition & wellness", icon: HeartPulse, prompt: "What is the health score of Masala Dosa?" },
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AssistantPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { id: createId(), role: "user", content: trimmed };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setMessage("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await sendChatMessage(trimmed, messages, controller.signal);
      setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: reply }]);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(
        "I couldn't reach the MenuMind assistant. Make sure the backend is running at the configured API URL, then try again.",
      );
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void send(message);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      void send(message);
    }
  }

  return (
    <section
      className="rise-in flex min-h-0 flex-1 flex-col rounded-2xl glass-strong p-5 lg:p-7"
      style={{ animationDelay: "0.2s" }}
    >
      {hasConversation ? (
        <>
          {/* Compact header while chatting */}
          <div className="flex flex-none items-center gap-3 border-b border-border/50 pb-4">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 amber-glow">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl leading-none text-foreground">MenuMind</h2>
              <p className="mt-1 text-xs text-muted-foreground">AI Restaurant Assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
            >
              New chat
            </button>
          </div>

          {/* Conversation */}
          <div ref={scrollRef} className="chat-scroll -mr-3 mt-4 flex-1 space-y-4 overflow-y-auto pr-3">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && <LoadingBubble />}
          </div>
        </>
      ) : (
        <>
          {/* Welcome header */}
          <div className="flex-none text-center">
            <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 amber-glow pulse-ring">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl text-foreground amber-text-glow text-balance lg:text-4xl">
              Hello! I&apos;m MenuMind
            </h2>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-primary/90">
              Your AI Restaurant Assistant
            </p>
            <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Ask me about any dish, get detailed information, check spice levels,
              allergens, health score and more.
            </p>
          </div>

          {/* Capability cards seed real prompts */}
          <div className="mt-6 grid flex-1 grid-cols-1 content-center gap-3 sm:grid-cols-2">
            {FEATURES.map(({ title, sub, icon: Icon, prompt }, i) => (
              <button
                key={title}
                type="button"
                onClick={() => void send(prompt)}
                className="hover-lift group flex items-center gap-3.5 rounded-xl glass p-3.5 text-left transition-colors hover:border-primary/40"
                style={{ animationDelay: `${0.25 + i * 0.05}s` }}
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight text-foreground">{title}</span>
                  <span className="mt-0.5 block text-xs leading-tight text-muted-foreground">{sub}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {error && (
        <p className="mt-3 flex-none rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
          {error}
        </p>
      )}

      {/* Premium input bar */}
      <form onSubmit={handleSubmit} className="mt-4 flex-none">
        <div className="flex items-center gap-2 rounded-2xl glass px-2.5 py-2 focus-within:border-primary/50 focus-within:amber-glow">
          <Sparkles className="ml-1 h-4 w-4 flex-none text-primary/80" />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any dish..."
            aria-label="Ask about any dish"
            disabled={isLoading}
            className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
          />
          <button
            type="button"
            aria-label="Voice input"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
          >
            <Mic className="h-[18px] w-[18px]" />
          </button>
          <button
            type="submit"
            aria-label="Send message"
            disabled={isLoading || !message.trim()}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary text-primary-foreground amber-glow transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </section>
  );
}
