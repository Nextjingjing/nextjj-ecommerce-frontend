import React from "react";
import type { OrderResponseDTO } from "../api/orders";

interface OrderCardProps {
  order: OrderResponseDTO;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold">
          Order #{order.id} — ฿{order.totalAmount.toFixed(2)}
        </h2>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        วันที่สั่งซื้อ: {new Date(order.orderDate).toLocaleString("th-TH")}
      </p>
      <p className="text-sm text-gray-500 mb-2">ผู้ใช้ ID: {order.userId}</p>

      <ul className="pl-5 list-disc text-sm">
        {order.items?.map((item) => (
          <li key={item.productId}>
            {item.productName} × {item.quantity} @ ฿
            {item.pricePerUnit.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
