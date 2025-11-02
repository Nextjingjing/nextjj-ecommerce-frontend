import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addItem } from "../store/cartSlice";
import type { Product } from "../api/productApi";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        quantity: 1,
      })
    );

    // แสดงสถานะเพิ่มสำเร็จชั่วคราว (UX นุ่มนวลกว่า alert)
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      {/* รูปสินค้า */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* ข้อมูลสินค้า */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">
            ฿{product.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">
            คงเหลือ: {product.stock}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`mt-4 w-full py-2 rounded-xl text-white transition 
            ${
              product.stock <= 0
                ? "bg-gray-300 cursor-not-allowed"
                : added
                ? "bg-green-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {product.stock <= 0
            ? "สินค้าหมด"
            : added
            ? "เพิ่มแล้ว ✅"
            : "เพิ่มลงตะกร้า"}
        </button>
      </div>
    </div>
  );
}
