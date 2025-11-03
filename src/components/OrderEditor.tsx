import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  updateOrderItems,
} from "../api/orders";
import type {
  OrderResponseDTO,
  OrderProductRequestDTO,
} from "../api/orders";

interface Props {
  order: OrderResponseDTO;
  onUpdated?: (updated: OrderResponseDTO) => void;
}

const OrderEditor: React.FC<Props> = ({ order, onUpdated }) => {
  const [items, setItems] = useState<OrderProductRequestDTO[]>(
    order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))
  );
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId: number, newQty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: newQty } : i
      )
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateOrderItems(order.id, items);
      onUpdated?.(updated);
    } catch {
      toast.error("เกิดข้อผิดพลาดในการอัปเดตคำสั่งซื้อ ถ้าคุณชำระรายการแล้วจะเปลี่ยนแปลงไม่ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      {order.items.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center mb-2"
        >
          <span className="text-sm text-gray-800">{item.productName}</span>
          <input
            type="number"
            min={1}
            value={
              items.find((i) => i.productId === item.productId)?.quantity || 1
            }
            onChange={(e) =>
              handleQuantityChange(item.productId, Number(e.target.value))
            }
            className="w-20 border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full mt-3 py-2 rounded-lg text-white font-medium ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
      </button>
    </div>
  );
};

export default OrderEditor;