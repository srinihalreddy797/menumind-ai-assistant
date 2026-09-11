import { Send } from "lucide-react";


function ChatInput({ canSend, input, onInputChange, onSubmit }) {
  return (
    <form className="chat-form" onSubmit={onSubmit}>
      <input
        aria-label="Message MenuMind AI"
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Ask about dishes, spice levels, prices, or dietary preferences..."
        value={input}
      />
      <button aria-label="Send message" disabled={!canSend} type="submit">
        <Send size={18} />
      </button>
    </form>
  );
}


export default ChatInput;
