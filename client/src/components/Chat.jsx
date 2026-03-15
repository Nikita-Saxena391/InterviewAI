import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(
        "https://interviewai-app-70e1.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch from server");

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "No response";

      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Failed to get response." },
      ]);
    }
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Top Bar */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold">Career Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.role === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="flex border-t border-gray-700 p-2 gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-l-lg border border-gray-700 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 px-4 py-2 rounded-r-lg hover:bg-purple-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
