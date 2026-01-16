import { useState } from "react";
import type { ChatMessage } from "../types/chat.types";

export const useNotebookChat = (notebookId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // 🔥 MOCK AI RESPONSE (replace with backend later)
    await new Promise((r) => setTimeout(r, 1200));

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "This answer is generated based on your uploaded documents.",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return {
    messages,
    loading,
    askQuestion,
  };
};
