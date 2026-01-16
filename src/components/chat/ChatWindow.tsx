import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useNotebookChat } from "../../hooks/useNotebookChat";

type Props = {
  notebookId: string;
};

const ChatWindow = ({ notebookId }: Props) => {
  const { messages, askQuestion, loading } =
    useNotebookChat(notebookId);

  return (
    <div className="flex flex-col h-full gap-3  text-purple-600 mb-2">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}
        {loading && (
          <p className="text-xs text-gray-400">AI is thinking…</p>
        )}
      </div>

      <ChatInput onSend={askQuestion} />
    </div>
  );
};

export default ChatWindow;
