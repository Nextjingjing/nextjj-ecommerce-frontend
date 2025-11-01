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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">สินค้า</h1>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">กำลังโหลด...</div>
        ) : products.length === 0 ? (
          <p className="text-gray-500">ไม่มีสินค้า</p>
        ) : (
          <>
            {/* สินค้า */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                onClick={() => handlePageChange(pageFromUrl - 1)}
                disabled={pageFromUrl === 1}
                className={`px-4 py-2 rounded-lg ${
                  pageFromUrl === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                ก่อนหน้า
              </button>

              <span className="text-gray-700">
                หน้า {pageFromUrl} / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pageFromUrl + 1)}
                disabled={pageFromUrl >= totalPages}
                className={`px-4 py-2 rounded-lg ${
                  pageFromUrl >= totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
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
