'use client';
import { useState, useEffect, useRef } from "react";

/**
 * A simple "dot flashing" component for the typing indicator.
 */
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 p-3">
      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Ref for the end of the chat list, to enable auto-scrolling
  const chatEndRef = useRef(null);

  /**
   * Scrolls the chat window to the bottom smoothly.
   */
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch initial chat history on component mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // We reverse the array to display oldest messages first (top)
          // and newest messages last (bottom).
          setChats(data.chats.reverse() || []);
        } else {
          setError(data.error || "Failed to load chat history.");
        }
      })
      .catch(() => setError("Failed to connect to the server."))
      .finally(() => setLoading(false));
  }, []);

  // Auto-scroll to bottom whenever the chats array or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [chats, loading]);

  /**
   * Handles sending a new message to the backend.
   */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return; // Don't send empty or while loading

    const userMessage = message; // Store the message to send
    setMessage(""); // Clear the input field immediately
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.success) {
        // Append the new, complete chat (message + answer) to the end of the array
        setChats((prev) => [...prev, data.chat]);
      } else {
        // If the API call fails, show an error and restore the user's message
        setError(data.detail || "Failed to get a response. Please try again.");
        setMessage(userMessage); // Put the failed message back in the input
      }
    } catch (err) {
      setError("Network error. Could not reach server.");
      setMessage(userMessage); // Put the failed message back in the input
    } finally {
      setLoading(false); // Stop loading, whether success or fail
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-center text-green-700">
          🌾 Farmer’s AI Chat
        </h1>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {chats.map((chat) => (
          <div key={chat._id || chat.createdAt}>
            {/* User's Message */}
            <div className="flex justify-end mb-2">
              <div className="bg-green-600 text-white p-3 rounded-xl max-w-xs md:max-w-md shadow-sm">
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
            
            {/* Bot's Answer */}
            {chat.answer && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-xl max-w-xs md:max-w-md shadow-sm border border-gray-200">
                  <p className="text-sm">{chat.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Bot Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-xl shadow-sm border border-gray-200">
              <TypingIndicator />
            </div>
          </div>
        )}
        
        {/* Empty div to mark the end, for auto-scrolling */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Form Area */}
      <footer className="bg-white p-4 shadow-inner">
        <div className="w-full max-w-3xl mx-auto">
          {error && (
            <p className="text-red-500 text-xs text-center mb-2">{error}</p>
          )}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your farm..."
              className="flex-1 border rounded-full py-3 px-5 outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-green-600 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center
                         hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                         disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {/* Send Icon (SVG) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                <path d="M3.105 3.105a.5.5 0 01.83-.09l12.7 12.7a.5.5 0 01-.09.83L11.7 18.29a.5.5 0 01-.45.08L3.08 15.11a.5.5 0 01-.09-.83L3.105 3.105zM4.795 4.795L1.5 12.11a.5.5 0 00.56.7l7.14-2.14a.5.5 0 00.3-.3l2.14-7.14a.5.5 0 00-.7-.56L4.795 4.795z" />
              </svg>
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
