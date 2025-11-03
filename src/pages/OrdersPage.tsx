import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import type { OrderResponseDTO } from "../api/orders";
import OrderCard from "../components/OrderCard";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        if (Array.isArray(response.content)) {
          setOrders(response.content);
        } else {
          setError("ข้อมูลจาก API ไม่ถูกต้อง");
        }
      } catch {
        setError("ไม่สามารถโหลดข้อมูลคำสั่งซื้อของคุณได้");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">⏳ กำลังโหลดข้อมูล...</p>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        ❌ เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 คำสั่งซื้อของฉัน</h1>

      {orders.length === 0 ? (
        <p>ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
