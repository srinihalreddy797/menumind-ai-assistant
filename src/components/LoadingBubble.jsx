import { Bot } from "lucide-react";


function LoadingBubble() {
  return (
    <div className="message-row">
      <div className="avatar avatar-bot">
        <Bot size={18} />
      </div>
      <div className="message-bubble message-bot loading-bubble">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}


export default LoadingBubble;
