import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const navigate = useNavigate(); // ✅ initialize navigate

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "No response";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: "Failed to get response." }]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      
      {/* Back Button */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold">Career Assistant</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                m.role === "user" ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-700">
        <input
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-purple-500 px-6 py-3 rounded-r-lg hover:bg-purple-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}