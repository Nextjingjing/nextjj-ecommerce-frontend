import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
      <h2 className="text-3xl font-bold mb-6 text-gray-800">ตะกร้าสินค้า</h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between py-4"
            >
              {/* รูปสินค้า */}
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

              {/* ปุ่มจำนวนสินค้า */}
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

              {/* ลบสินค้า */}
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* สรุปยอดรวม */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            รวมทั้งหมด:{" "}
            <span className="text-blue-600">
              {total.toLocaleString()} ฿
            </span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              ล้างตะกร้า
            </button>
            <button
              onClick={() => alert("ไปหน้าชำระเงิน (ยังไม่เชื่อมต่อ)")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
