import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  updateOrderItems,
  type OrderResponseDTO,
  type OrderProductRequestDTO,
} from "../api/orders";
import { Trash2, Save } from "lucide-react";

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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        รายการสินค้า
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">
          ไม่มีสินค้าในคำสั่งซื้อนี้
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const info = order.items.find((i) => i.productId === item.productId);
            return (
              <li
                key={item.productId}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:shadow-sm transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {info?.productName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ราคา {info?.pricePerUnit.toLocaleString()} บาท/ชิ้น
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, Number(e.target.value))
                    }
                    className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition"
                    title="ลบสินค้า"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <button
        onClick={handleSave}
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full mt-5 py-2.5 rounded-lg text-white font-medium shadow-sm transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
        }`}
      >
        <Save size={16} />
        {loading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
      </button>
    </div>
  );
};

export default OrderEditor;
