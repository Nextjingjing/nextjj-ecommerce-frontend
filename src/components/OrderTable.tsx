import React from "react";
import type { OrderResponseDTO } from "../api/orders";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  orders: OrderResponseDTO[];
}

const OrderTable: React.FC<Props> = ({ orders }) => {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="p-3 text-left border-b">วันที่</th>
            <th className="p-3 text-left border-b">รหัสคำสั่งซื้อ</th>
            <th className="p-3 text-left border-b">รายการสินค้า</th>
            <th className="p-3 text-right border-b">ยอดรวม</th>
            <th className="p-3 text-center border-b">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="p-3 border-b">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="p-3 border-b">{order.id}</td>
              <td className="p-3 border-b">
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      {item.productName} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border-b text-right font-semibold">
                {order.totalAmount.toLocaleString()} บาท
              </td>
              <td className="p-3 border-b text-center">
                <OrderStatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
