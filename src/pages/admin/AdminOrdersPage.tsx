import React, { useEffect, useState } from "react";
import { getAllOrders, type OrderResponseDTO } from "../../api/orders";
import { getUserInfoById, type UserInfoResponse } from "../../api/userApi";

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserInfoResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadOrders = async (pageNum = 0) => {
    setLoading(true);
    try {
      const res = await getAllOrders(pageNum, 10);
      setOrders(res.content);
      setTotalPages(res.totalPages);
      setPage(res.number);
    } catch (err) {
      console.error("โหลดคำสั่งซื้อไม่สำเร็จ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = async (userId: number) => {
    try {
      const user = await getUserInfoById(userId);
      setSelectedUser(user);
      setShowModal(true);
    } catch (err) {
      console.error("โหลดข้อมูลผู้ใช้ไม่สำเร็จ:", err);
      alert("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
    }
  };

  useEffect(() => {
    loadOrders(0);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 จัดการคำสั่งซื้อทั้งหมด</h1>

      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <>
          <table className="w-full border-collapse border text-sm bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">ลำดับ</th>
                <th className="border p-2">ID</th>
                <th className="border p-2">วันที่สั่ง</th>
                <th className="border p-2">ยอดรวม</th>
                <th className="border p-2">สถานะ</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr key={o.id} className="hover:bg-gray-50 text-center">
                  <td className="border p-2">{page * 10 + index + 1}</td>
                  <td className="border p-2">{o.id}</td>
                  <td className="border p-2">
                    {new Date(o.orderDate).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {o.totalAmount.toLocaleString()} บาท
                  </td>
                  <td className="border p-2">{o.status}</td>
                  <td className="border p-2">{o.userId}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleViewUser(o.userId)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow transition transform hover:scale-105 text-xs"
                    >
                      👁️ ดูข้อมูล
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <button
              disabled={page === 0}
              onClick={() => loadOrders(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              ก่อนหน้า
            </button>
            <span>
              หน้า {page + 1} จาก {totalPages}
            </span>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => loadOrders(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              ถัดไป
            </button>
          </div>
        </>
      )}

      {/* 🪟 Modal: User Info */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-100/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 relative transform transition-all scale-100 border border-gray-200">
            {/* ปุ่มปิด */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full shadow-inner">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">ข้อมูลผู้ใช้</h2>
              <p className="text-gray-500 text-sm mt-1">
                รายละเอียดผู้ใช้จากคำสั่งซื้อนี้
              </p>
            </div>

            {/* Content */}
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">ชื่อ-สกุล: </span>
                {selectedUser.fname} {selectedUser.lname}
              </p>
              <p>
                <span className="font-semibold text-gray-900">โทรศัพท์: </span>
                {selectedUser.tel}
              </p>
              <p>
                <span className="font-semibold text-gray-900">ที่อยู่: </span>
                {selectedUser.address}
              </p>
              <p>
                <span className="font-semibold text-gray-900">User ID: </span>
                {selectedUser.userId}
              </p>
            </div>

            {/* ปุ่มปิด */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow hover:shadow-md"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;