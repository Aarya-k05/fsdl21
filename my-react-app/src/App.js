import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import Firestore instance
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore"; // Use Firestore's timestamp

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 🔹 Fetch messages from Firestore in real time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // 🔹 Send message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: serverTimestamp(), // Use Firestore server timestamp
    });

    setNewMessage(""); // Clear input field after sending
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>React Chat App</h2>

      {/* Chat messages container */}
      <div style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#fafafa",
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            background: "#e3f2fd",
            padding: "8px",
            borderRadius: "5px",
            marginBottom: "5px",
            wordWrap: "break-word",
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message input form */}
      <form onSubmit={sendMessage} style={{ marginTop: "10px", display: "flex" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button type="submit" style={{
          padding: "8px 12px",
          marginLeft: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
