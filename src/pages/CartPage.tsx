import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { createOrder } from "../api/orders";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ สร้างออเดอร์ใหม่
  const handleCreateOrder = async () => {
    if (items.length === 0) {
      toast.error("ตะกร้าสินค้าว่าง");
      return;
    }

    try {
      toast.loading("กำลังสร้างคำสั่งซื้อ...");

      // แปลง items ให้อยู่ในรูปแบบ API ต้องการ
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const order = await createOrder({ items: orderItems });

      toast.dismiss();
      toast.success(`สร้างคำสั่งซื้อ #${order.id} สำเร็จแล้ว!`);

      dispatch(clearCart());
      navigate("/orders");
    } catch (error) {
      toast.dismiss();
      toast.error("เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ");
      console.error(error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4">🛒 ตะกร้าสินค้าว่าง</h2>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ไปเลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl font-bold mb-6 text-gray-800">ตะกร้าสินค้า</h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between py-4"
            >
              {/* รูปและรายละเอียดสินค้า */}
              <div className="flex items-center space-x-4 w-full md:w-1/2">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {item.description || "ไม่มีรายละเอียด"}
                  </p>
                  <p className="text-blue-600 font-medium mt-1">
                    {item.price.toLocaleString()} ฿
                  </p>
                </div>
              </div>

              {/* ปุ่มเพิ่มลดจำนวน */}
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  onClick={() =>
                    item.quantity > 1 &&
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
              </div>

              {/* ปุ่มลบสินค้า */}
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => {
                    dispatch(removeItem(item.id));
                    toast.success(`ลบ ${item.name} ออกจากตะกร้าแล้ว`);
                  }}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* สรุปราคารวม + ปุ่มจัดการ */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            รวมทั้งหมด:{" "}
            <span className="text-blue-600">
              {total.toLocaleString()} ฿
            </span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                dispatch(clearCart());
                toast("ล้างตะกร้าเรียบร้อยแล้ว", { icon: "🧹" });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              ล้างตะกร้า
            </button>

            <button
              onClick={handleCreateOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
