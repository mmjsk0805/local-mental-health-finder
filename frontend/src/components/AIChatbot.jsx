import React, { useState } from "react";
import axios from "axios";
import "./AIChatbot.css";

function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Handles sending user input to backend + rendering assistant reply
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add new user message with timestamp
    const newMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Call backend API with full conversation history
      const response = await axios.post(
        "https://local-mental-health-finder-1.onrender.com/api/chatbot",
        { messages: updatedMessages }
      );

      const reply = response.data.reply;

      // Add assistant response with timestamp
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);

      // Graceful fallback in case of error
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <h2 className="chat-title">😊 AI Therapy Chatbot</h2>

        {/* Message history display */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="avatar">{msg.role === "user" ? "🧑" : "😊"}</div>
              <div className="message-bubble">
                <div className="message-content">{msg.content}</div>
                <div className="timestamp">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator when assistant is thinking */}
          {isTyping && (
            <div className="chat-message assistant typing-indicator">
              <div className="avatar">😊</div>
              <div className="message-bubble typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input field + submit button */}
        <form className="chat-form" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button type="submit" className="chat-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIChatbot;
