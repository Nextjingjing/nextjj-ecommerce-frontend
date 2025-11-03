import React, { useEffect, useState } from "react";
import { getOrders, type OrderResponseDTO } from "../api/orders";
import OrderEditor from "../components/OrderEditor";
import OrderStatusBadge from "../components/OrderStatusBadge";
import toast from "react-hot-toast";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.content);
      } catch {
        toast.error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
      }
    };
    fetchOrders();
  }, []);

  const handleOrderUpdated = (updated: OrderResponseDTO) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    toast.success(`อัปเดตคำสั่งซื้อ #${updated.id} สำเร็จ`);
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">คำสั่งซื้อของฉัน</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="grid gap-4">
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

              <ul className="text-sm text-gray-700 mb-2">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.productName} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">
                  {order.totalAmount.toLocaleString()} บาท
                </span>
                <button
                  onClick={() =>
                    setEditingId(editingId === order.id ? null : order.id)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  {editingId === order.id ? "ปิด" : "แก้ไข"}
                </button>
              </div>

              {editingId === order.id && (
                <div className="mt-3 border-t pt-3">
                  <OrderEditor order={order} onUpdated={handleOrderUpdated} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
