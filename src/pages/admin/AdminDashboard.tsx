import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🧭 แผงควบคุมผู้ดูแลระบบ (Admin Dashboard)
        </h1>
        <p className="text-gray-600 mt-1">
          จัดการข้อมูลสินค้าและคำสั่งซื้อในระบบของคุณได้จากที่นี่
        </p>
      </header>

      {/* Dashboard Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* 🛍️ Product Management */}
        <div
          onClick={() => navigate("/admin/product")}
          className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg border hover:border-blue-500 transition-all p-6 flex flex-col items-center text-center"
        >
          <div className="text-blue-600 text-5xl mb-4">🛍️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            จัดการสินค้า
          </h2>
          <p className="text-gray-600 text-sm">
            เพิ่ม ลบ หรือแก้ไขข้อมูลสินค้าทั้งหมดในร้าน
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            ไปที่หน้า จัดการสินค้า
          </button>
        </div>

        {/* 📦 Orders Management */}
        <div
          onClick={() => navigate("/admin/orders")}
          className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg border hover:border-green-500 transition-all p-6 flex flex-col items-center text-center"
        >
          <div className="text-green-600 text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            จัดการคำสั่งซื้อ
          </h2>
          <p className="text-gray-600 text-sm">
            ตรวจสอบและอัปเดตสถานะคำสั่งซื้อของลูกค้า
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            ไปที่หน้า คำสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
