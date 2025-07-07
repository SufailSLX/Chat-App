// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/chat" element={<div>Chat Room</div>} /> */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
