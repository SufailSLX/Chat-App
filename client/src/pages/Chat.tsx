import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface ChatMessage {
  _id: string;
  message: string;
  sender: { username: string };
  createdAt: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Fetch old messages
    axios.get("http://localhost:5000/api/messages").then((res) => {
      setMessages(res.data);
    });

    // Real-time message receiving
    socket.on("receiveMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (!message || !user) return;

    const newMsg = {
      senderId: user.id,
      message,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/messages", newMsg);
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", res.data);
      setMessage("");
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>
      <div className="bg-white shadow rounded h-64 overflow-y-auto mb-4 p-2">
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender.username}</strong>:
            <span className="ml-1">{msg.message}</span>
            <span className="ml-2 text-sm text-gray-400">
              ({new Date(msg.createdAt).toLocaleTimeString()})
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
