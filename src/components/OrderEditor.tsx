import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  updateOrderItems,
} from "../api/orders";
import type {
  OrderResponseDTO,
  OrderProductRequestDTO,
} from "../api/orders";

import { Trash2 } from "lucide-react";

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

  const handleRemoveItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleSave = async () => {
    if (items.length === 0) {
      toast.error("ต้องมีสินค้าอย่างน้อย 1 รายการ");
      return;
    }

    setLoading(true);
    try {
      const updated = await updateOrderItems(order.id, items);
      onUpdated?.(updated);
      toast.success(`อัปเดตคำสั่งซื้อ #${updated.id} สำเร็จ`);
    } catch {
      toast.error("เกิดข้อผิดพลาดในการอัปเดตคำสั่งซื้อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          ไม่มีสินค้าในรายการ
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center mb-2 bg-white p-2 rounded-md border"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {
                  order.items.find((i) => i.productId === item.productId)
                    ?.productName
                }
              </p>
              <p className="text-xs text-gray-500">
                ราคา{" "}
                {order.items
                  .find((i) => i.productId === item.productId)
                  ?.pricePerUnit.toLocaleString()}{" "}
                บาท/ชิ้น
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, Number(e.target.value))
                }
                className="w-16 border rounded-md px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:text-red-700 p-1"
                title="ลบสินค้า"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}

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