import type { Product } from "../api/productApi";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">
            ฿{product.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">
            คงเหลือ: {product.stock}
          </span>
        </div>

        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}
