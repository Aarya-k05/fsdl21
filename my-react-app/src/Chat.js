import { useState } from "react";
import { db } from "./firebase"; // Ensure this is the correct path
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore"; // Corrected import

const Chat = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
      });
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("🚨 Error sending message:", error);
      alert("Failed to send message. Try again!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h3 style={{ textAlign: "center" }}>Chat</h3>
      <form 
        onSubmit={sendMessage} 
        style={{ display: "flex", gap: "10px", marginTop: "10px" }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <button 
          type="submit"
          style={{
            padding: "8px 12px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
