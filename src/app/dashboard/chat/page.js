'use client';
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => setChats(data.chats || []));
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (data.success) setChats((prev) => [data.chat, ...prev]);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 flex flex-col">
        <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">🌾 Farmer’s AI Chat</h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-3 h-[60vh] border p-3 rounded-lg">
          {chats.map((chat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="bg-green-100 p-2 rounded-lg self-end mb-2">
                <p className="text-sm">{chat.message}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg self-start">
                <p className="text-sm text-gray-700">{chat.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your farm..."
            className="flex-1 border rounded-lg p-3 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}