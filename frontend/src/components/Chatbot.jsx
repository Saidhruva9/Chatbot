import React, { useState } from "react";
import "./Chatbot.css"; // Import the custom CSS file for styling

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userMessage = input;
    setInput("");

    try {
      // Send the user's message to the backend using fetch
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add the bot's response to the chat
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error connecting to the backend:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't connect to the server. Please try again later.", sender: "bot" }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">
        <h1 className="chatbot-header">Chatbot</h1>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="chatbot-input"
          />
          <button onClick={sendMessage} className="chatbot-send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}