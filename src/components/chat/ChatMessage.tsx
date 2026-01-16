type Props = {
  role: "user" | "assistant";
  content: string;
};

const ChatMessage = ({ role, content }: Props) => {
  return (
    <div
      className={`p-3 rounded-lg max-w-xl ${
        role === "user"
          ? "bg-purple-600 text-white self-end"
          : "bg-gray-100 text-gray-800 self-start"
      }`}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
