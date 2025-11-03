import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import type { OrderResponseDTO } from "../api/orders";

import OrderTable from "../components/OrderTable";
import OrderCardList from "../components/OrderCardList";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.content);
      } catch {
        setError("ไม่สามารถดึงข้อมูลคำสั่งซื้อได้");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-600">
        กำลังโหลดข้อมูล...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        {error}
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        รายการคำสั่งซื้อของฉัน
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <>
          <OrderTable orders={orders} />
          <OrderCardList orders={orders} />
        </>
      )}
    </div>
  );
};

export default OrdersPage;
