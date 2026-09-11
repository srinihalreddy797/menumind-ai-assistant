import { useEffect, useMemo, useRef, useState } from "react";

import { sendChatMessage } from "./api";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import LoadingBubble from "./components/LoadingBubble";
import MessageBubble from "./components/MessageBubble";
import { STARTER_MESSAGES } from "./constants";


function App() {
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const userMessage = {
      role: "user",
      content: input.trim(),
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage.content, messages);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (caughtError) {
      setError(caughtError.message);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Sorry, I could not complete that request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="chat-panel">
        <ChatHeader />

        <div className="messages">
          {messages.map((message, index) => (
            <MessageBubble key={`${message.role}-${index}`} message={message} />
          ))}
          {isLoading && <LoadingBubble />}
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="error-banner">{error}</div>}

        <ChatInput
          canSend={canSend}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}


export default App;
