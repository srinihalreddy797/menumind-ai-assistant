import { Sparkles, User } from "lucide-react";
import type { ChatMessage } from "@/lib/menumind/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <span
        className={[
          "flex h-8 w-8 flex-none items-center justify-center rounded-full",
          isUser
            ? "bg-foreground/10 text-foreground"
            : "bg-primary/15 text-primary amber-glow",
        ].join(" ")}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </span>
      <div
        className={[
          "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "glass-strong rounded-br-md text-foreground"
            : "glass rounded-bl-md text-foreground/90",
        ].join(" ")}
      >
        <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
      </div>
    </div>
  );
}
