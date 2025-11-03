import React, { useState } from "react";
import type { OrderResponseDTO } from "../api/orders";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderEditor from "./OrderEditor"; // ✅ นำเข้าตัวแก้ไข
import toast from "react-hot-toast";

interface Props {
  orders: OrderResponseDTO[];
  onUpdated?: (updated: OrderResponseDTO) => void;
}

const OrderCardList: React.FC<Props> = ({ orders, onUpdated }) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleToggleEdit = (id: number) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleUpdated = (updated: OrderResponseDTO) => {
    toast.success(`อัปเดตคำสั่งซื้อ #${updated.id} สำเร็จ`);
    onUpdated?.(updated);
    setEditingId(null);
  };

  if (!orders.length)
    return <p className="text-gray-500 text-center">ยังไม่มีคำสั่งซื้อ</p>;

  return (
    <div className="grid gap-4 mt-6 md:hidden">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {new Date(order.orderDate).toLocaleDateString()}
            </span>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="font-semibold text-gray-800 mb-1">
            คำสั่งซื้อ #{order.id}
          </div>

          <ul className="text-sm text-gray-700 mb-3">
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.productName} × {item.quantity}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">
              {order.totalAmount.toLocaleString()} บาท
            </span>

            <button
              onClick={() => handleToggleEdit(order.id)}
              className="text-blue-600 text-sm hover:underline"
            >
              {editingId === order.id ? "ปิด" : "แก้ไข"}
            </button>
          </div>

          {/* ✅ แสดง editor เมื่อกด “แก้ไข” */}
          {editingId === order.id && (
            <div className="mt-4 border-t pt-3">
              <OrderEditor order={order} onUpdated={handleUpdated} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderCardList;
