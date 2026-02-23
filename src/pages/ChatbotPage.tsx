// import { useState } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// type Source = {
//   id: string;
//   title: string;
//   summary: string;
// };

// const CHAT_API = "http://127.0.0.1:8000/chat";
// const SUMMARIZE_API = "http://127.0.0.1:8000/summarize";

// const ChatbotPage = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [sources, setSources] = useState<Source[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [sending, setSending] = useState(false);

//   // 🟢 Upload document & summarize
//   const handleUpload = async (file: File) => {
//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch(SUMMARIZE_API, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Summarize failed");

//       const data = await res.json();

//       setSources((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           title: data.filename,
//           summary: data.summary,
//         },
//       ]);

//     } catch (err) {
//       console.error(err);
//       alert("File upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 🟢 Send chat message (REAL BACKEND)
//   const sendMessage = async () => {
//     if (!input.trim() || sending) return;

//     const userText = input.trim();

//     setMessages((prev) => [
//       ...prev,
//       { role: "user", content: userText },
//     ]);
//     setInput("");
//     setSending(true);

//     // 🔹 context handling (VERY IMPORTANT)
//     const context =
//       sources.length > 0
//         ? sources.map((s) => s.summary).join("\n")
//         : "No document uploaded. Answer generally.";

//     try {
//       const res = await fetch(CHAT_API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({
//           question: userText,
//           context: context,
//         }),
//       });

//       if (!res.ok) throw new Error("Chat API failed");

//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: data.answer },
//       ]);

//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Server error. Please try again.",
//         },
//       ]);
//     } finally {
//       setSending(false);
//     }
//   };

//   // 🟢 Edit summary
//   const saveSummary = (id: string, text: string) => {
//     setSources((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, summary: text } : s))
//     );
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
//       {/* Header */}
//       <header className="p-4 border-b bg-white dark:bg-gray-800 flex justify-between">
//         <h1 className="text-xl font-semibold">AI Notebook Chatbot</h1>

//         <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
//           {uploading ? "Uploading..." : "Upload Document"}
//           <input
//             type="file"
//             className="hidden"
//             onChange={(e) =>
//               e.target.files && handleUpload(e.target.files[0])
//             }
//           />
//         </label>
//       </header>

//       {/* Main */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Chat Section */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           {messages.length === 0 && (
//             <p className="text-gray-500 text-sm">
//               Upload a document OR ask a general question…
//             </p>
//           )}

//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`mb-3 max-w-xl ${
//                 msg.role === "user" ? "ml-auto text-right" : "mr-auto"
//               }`}
//             >
//               <div
//                 className={`inline-block px-4 py-2 rounded-xl text-sm
//                 ${
//                   msg.role === "user"
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-200 dark:bg-gray-700"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Notebook Section */}
//         <div className="w-96 border-l bg-white dark:bg-gray-800 p-4 overflow-y-auto">
//           <h2 className="font-semibold mb-4">Notebook</h2>

//           {sources.length === 0 && (
//             <p className="text-sm text-gray-500">
//               No documents uploaded yet.
//             </p>
//           )}

//           {sources.map((s) => (
//             <div key={s.id} className="mb-4">
//               <h3 className="text-sm font-medium mb-2">{s.title}</h3>
//               <textarea
//                 value={s.summary}
//                 className="w-full min-h-[120px] p-2 text-sm border rounded-md dark:bg-gray-700"
//                 onChange={(e) => saveSummary(s.id, e.target.value)}
//               />
//               <p className="text-xs text-gray-400 mt-1">
//                 Editable summary
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t bg-white dark:bg-gray-800 flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask something..."
//           className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-700"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={sending}
//           className="px-4 py-2 rounded-lg bg-purple-600 text-white"
//         >
//           {sending ? "Thinking..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;


import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const CHAT_API = "http://127.0.0.1:8000/chat";

const SimpleChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    // add user message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error talking to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-purple-600 text-white font-semibold">
        Simple Real-Time Chatbot
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 max-w-md ${
              m.role === "user" ? "ml-auto text-right" : "mr-auto"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg text-sm ${
                m.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-white border"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-400">AI is typing...</p>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SimpleChatbot;

