import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../api/authApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length >= 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!passwordsMatch) {
      setMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await apiRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === "success") {
        setMessage("✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        // ✅ ไม่ login อัตโนมัติ แต่ redirect ไปหน้า login
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(res.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (error: any) {
      console.error(error);
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          สมัครสมาชิก
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">ชื่อผู้ใช้</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">อีเมล</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
              formData.confirmPassword && !passwordsMatch
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-500"
            }`}
          />
          {formData.confirmPassword && !passwordsMatch && (
            <p className="text-red-500 text-sm mt-1">⚠️ รหัสผ่านไม่ตรงกัน</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!passwordsMatch || loading}
          className={`w-full py-2 rounded-lg transition text-white ${
            !passwordsMatch || loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          มีบัญชีอยู่แล้ว?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </form>
    </div>
  );
}
