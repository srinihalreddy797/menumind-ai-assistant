import { Sparkles } from "lucide-react";


function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="brand-mark">
        <Sparkles size={20} />
      </div>
      <div>
        <h1>MenuMind AI</h1>
        <p>Restaurant assistant with Gemini tool calling</p>
      </div>
    </header>
  );
}


export default ChatHeader;
