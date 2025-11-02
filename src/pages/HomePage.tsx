import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productApi";
import type { Product, ProductResponse } from "../api/productApi";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const apiPage = pageFromUrl - 1;

  const loadProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      const data: ProductResponse = await fetchProducts(pageNum, 6);
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(apiPage);
  }, [apiPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
            🛍️ สินค้าทั้งหมด
          </h1>
          <p className="text-slate-500 text-lg">
            ค้นพบสินค้าที่น่าสนใจจากคลังของเรา
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl h-80 shadow-md border border-gray-100"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            😢 ไม่มีสินค้าในตอนนี้
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={() => handlePageChange(pageFromUrl - 1)}
                disabled={pageFromUrl === 1}
                className={`px-5 py-2 rounded-lg transition font-medium ${
                  pageFromUrl === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow"
                }`}
              >
                ก่อนหน้า
              </button>

              <span className="text-gray-700 font-semibold">
                หน้า {pageFromUrl} / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pageFromUrl + 1)}
                disabled={pageFromUrl >= totalPages}
                className={`px-5 py-2 rounded-lg transition font-medium ${
                  pageFromUrl >= totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow"
                }`}
              >
                ถัดไป
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
