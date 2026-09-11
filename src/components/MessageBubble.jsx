import { Bot, User } from "lucide-react";


function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const Icon = isUser ? User : Bot;

  return (
    <div className={`message-row ${isUser ? "message-row-user" : ""}`}>
      <div className={`avatar ${isUser ? "avatar-user" : "avatar-bot"}`}>
        <Icon size={18} />
      </div>
      <div className={`message-bubble ${isUser ? "message-user" : "message-bot"}`}>
        {message.content}
      </div>
    </div>
  );
}


export default MessageBubble;
