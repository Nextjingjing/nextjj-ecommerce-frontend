import React, { useEffect, useState } from "react";
import { getOrders, type OrderResponseDTO } from "../api/orders";
import OrderEditor from "../components/OrderEditor";
import OrderStatusBadge from "../components/OrderStatusBadge";
import toast from "react-hot-toast";
import { createPaymentIntent } from "../api/paymentApi";

const handlePay = async (orderId: number) => {
  try {
    const { clientSecret } = await createPaymentIntent({ orderId });
    window.location.href = `/checkout?clientSecret=${encodeURIComponent(clientSecret)}`;
  } catch {
    toast.error("ไม่สามารถเริ่มการชำระเงินได้");
  }
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"PENDING" | "PAID">("PENDING");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();

        // ✅ เรียงจากใหม่ → เก่า
        const sorted = res.content.sort(
          (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );

        setOrders(sorted);
      } catch {
        toast.error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
      }
    };
    fetchOrders();
  }, []);

  const handleOrderUpdated = (updated: OrderResponseDTO) => {
    setOrders((prev) =>
      prev
        .map((o) => (o.id === updated.id ? updated : o))
        .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    );
    toast.success(`อัปเดตคำสั่งซื้อ #${updated.id} สำเร็จ`);
    setEditingId(null);
  };

  // ✅ แยกตามสถานะ
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const paidOrders = orders.filter((o) => o.status === "PAID");

  // ✅ เลือกกลุ่มที่จะโชว์ตามแท็บ
  const currentOrders = activeTab === "PENDING" ? pendingOrders : paidOrders;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">คำสั่งซื้อของฉัน</h1>

      {/* 🔹 ปุ่มเลือกสถานะ */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "PENDING"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          🕓 รอชำระเงิน ({pendingOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("PAID")}
          className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "PAID"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          ✅ ชำระแล้ว ({paidOrders.length})
        </button>
      </div>

      {/* 🔹 แสดงรายการตามแท็บ */}
      {currentOrders.length === 0 ? (
        <p className="text-gray-500 text-center">
          {activeTab === "PENDING"
            ? "ยังไม่มีคำสั่งซื้อที่รอชำระเงิน"
            : "ยังไม่มีคำสั่งซื้อที่ชำระแล้ว"}
        </p>
      ) : (
        <div className="grid gap-4">
          {currentOrders.map((order) => (
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

                {/* แก้ไขได้เฉพาะ PENDING */}
                {order.status === "PENDING" && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() =>
                        setEditingId(editingId === order.id ? null : order.id)
                      }
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {editingId === order.id ? "ปิด" : "แก้ไข"}
                    </button>

                    <button
                      onClick={() => handlePay(order.id)}
                      className="text-green-600 text-sm hover:underline"
                    >
                      💳 จ่ายเลย
                    </button>
                  </div>
                )}
              </div>

              {editingId === order.id && order.status === "PENDING" && (
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
