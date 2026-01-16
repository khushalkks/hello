import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText("");
      }}
      className="flex gap-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Ask AI..."
      />
      <button className="bg-purple-600 text-white px-4 rounded-lg">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
