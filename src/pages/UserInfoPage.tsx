import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../api/userApi";
import type { UserInfoResponse, UserUpdateRequest } from "../api/userApi";

const UserInfoPage: React.FC = () => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState<UserUpdateRequest>({
    fname: "",
    lname: "",
    address: "",
    tel: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
        setFormData({
          fname: data.fname,
          lname: data.lname,
          address: data.address,
          tel: data.tel,
        });
      } catch {
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updated = await updateUserInfo(formData);
      setUser(updated);
      setIsEditing(false);
      setMessage({ type: "success", text: "บันทึกข้อมูลเรียบร้อยแล้ว ✅" });

      // เคลียร์ข้อความหลัง 3 วินาที
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล ❌" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">กำลังโหลดข้อมูล...</div>;

  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🧑‍💼 ข้อมูลผู้ใช้
        </h2>

        {/* ✅ แสดงข้อความแจ้งเตือน */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium transition-all ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {user ? (
          <div className="space-y-3 text-gray-700">
            <div>
              <label className="font-semibold text-gray-900">ชื่อ:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{user.fname}</p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-900">นามสกุล:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{user.lname}</p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-900">ที่อยู่:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{user.address}</p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-900">เบอร์โทร:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="เช่น 0812345678"
                />
              ) : (
                <p>{user.tel}</p>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    💾 บันทึก
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    ยกเลิก
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  ✏️ แก้ไขข้อมูล
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">ไม่พบข้อมูลผู้ใช้</p>
        )}
      </div>
    </div>
  );
};

export default UserInfoPage;
