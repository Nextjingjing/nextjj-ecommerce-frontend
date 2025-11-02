import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addItem, updateQuantity, removeItem } from "../store/cartSlice";
import type { Product } from "../api/productApi";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === product.id)
  );

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
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  const handleIncrease = () => {
    if (!cartItem) return;
    if (cartItem.quantity < product.stock) {
      dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 }));
    } else {
      dispatch(removeItem(product.id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative border border-gray-100">
      {/* รูปสินค้า */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">สินค้าหมด</span>
          </div>
        )}
      </div>

      {/* รายละเอียดสินค้า */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>
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

        {/* ปุ่ม */}
        {cartItem ? (
          <div className="mt-5 flex items-center justify-between bg-blue-50 rounded-xl p-2">
            <button
              onClick={handleDecrease}
              className="bg-blue-500 text-white w-10 h-10 rounded-lg text-xl font-bold hover:bg-blue-600 transition"
            >
              −
            </button>
            <span className="font-semibold text-gray-800 text-lg">
              {cartItem.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={cartItem.quantity >= product.stock}
              className={`w-10 h-10 rounded-lg text-xl font-bold transition ${
                cartItem.quantity >= product.stock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`mt-5 w-full py-2.5 rounded-xl font-medium transition-all duration-300 
              ${
                product.stock <= 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              }`}
          >
            {product.stock <= 0
              ? "สินค้าหมด"
              : added
              ? "เพิ่มแล้ว ✅"
              : "เพิ่มลงตะกร้า"}
          </button>
        )}
      </div>
    </div>
  );
}
