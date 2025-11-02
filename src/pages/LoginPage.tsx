import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { loginSuccess } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await login({ username, password });
      if (res.status === "success") {
        dispatch(loginSuccess(username)); 
        navigate("/");
      } else {
        setMessage(res.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch {
      setMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          เข้าสู่ระบบ
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ชื่อผู้ใช้"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          เข้าสู่ระบบ
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
