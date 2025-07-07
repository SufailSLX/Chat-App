// src/pages/Register.tsx
import { useState } from "react";
import API from "../utils/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      dispatch(loginSuccess(res.data));
      navigate("/chat");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />
      <button type="submit" className="btn">Register</button>
    </form>
  );
}
