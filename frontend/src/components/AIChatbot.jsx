import React, { useState } from "react";
import axios from "axios";

function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3001/api/chatbot", {
        messages: updatedMessages,
      });

      const reply = response.data.reply;

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error." },
      ]);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: "0.5rem 0",
              color: msg.role === "user" ? "#333" : "#007BFF",
              fontWeight: msg.role === "user" ? "normal" : "bold",
            }}
          >
            {msg.role === "user" ? "You: " : "Therapist: "}
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "2px solid #007BFF",
            borderRadius: "4px 0 0 4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            border: "2px solid #007BFF",
            background: "#007BFF",
            color: "white",
            borderRadius: "0 4px 4px 0",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default AIChatbot;
