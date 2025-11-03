import React from "react";
import type { OrderResponseDTO } from "../api/orders";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  orders: OrderResponseDTO[];
}

const OrderCardList: React.FC<Props> = ({ orders }) => {
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
          <ul className="text-sm text-gray-700 mb-2">
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.productName} × {item.quantity}
              </li>
            ))}
          </ul>
          <div className="text-right font-semibold text-gray-900">
            {order.totalAmount.toLocaleString()} บาท
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCardList;
