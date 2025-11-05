import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
  type ProductRequest,
} from "../../api/productApi";
import { toast } from "react-hot-toast";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<ProductRequest>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: null,
    image: null,
  });

  const loadProducts = async (pageNum = 0) => {
    setLoading(true);
    try {
      const data = await fetchProducts(pageNum);
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการโหลดสินค้า");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success("แก้ไขสินค้าเรียบร้อยแล้ว ✅");
      } else {
        await createProduct(formData);
        toast.success("เพิ่มสินค้าเรียบร้อยแล้ว 🎉");
      }

      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: null,
        image: null,
      });
      setEditingProduct(null);
      loadProducts(page);
    } catch (error) {
      console.error(error);
      toast.error("ไม่สามารถบันทึกสินค้าได้ ❌");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) return;
    try {
      await deleteProduct(id);
      toast.success("ลบสินค้าเรียบร้อยแล้ว 🗑️");
      loadProducts(page);
    } catch (error) {
      console.error(error);
      toast.error("ลบสินค้าไม่สำเร็จ ❌");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      image: null,
    });
    toast("กำลังแก้ไขสินค้า ✏️", { icon: "🛠️" });
  };

  return (
    <div className="p-6">
      {/* ส่วนหัวหน้า */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🛍️ จัดการสินค้า (Product Management)
        </h1>
        <p className="text-gray-600 mt-1">
          เพิ่ม แก้ไข หรือลบสินค้าในระบบร้านค้าของคุณได้ที่นี่
        </p>
      </header>

      {/* ฟอร์มเพิ่ม/แก้ไขสินค้า */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 flex items-center gap-2">
          {editingProduct ? "✏️ แก้ไขสินค้า" : "➕ เพิ่มสินค้าใหม่"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
        >
          {/* ชื่อสินค้า */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อสินค้า
            </label>
            <input
              type="text"
              placeholder="ชื่อสินค้า"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* รายละเอียดสินค้า */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รายละเอียดสินค้า
            </label>
            <textarea
              placeholder="รายละเอียดสินค้า"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>

          {/* ราคา / สต็อก */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคา (บาท)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จำนวนคงเหลือ (สต็อก)
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          {/* อัปโหลดรูป */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รูปภาพสินค้า
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files?.[0] || null })
              }
              className="border p-2 w-full rounded"
            />
          </div>

          {/* ปุ่มบันทึก / ยกเลิก */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: "",
                    description: "",
                    price: 0,
                    stock: 0,
                    categoryId: null,
                    image: null,
                  });
                  toast("ยกเลิกการแก้ไขสินค้า", { icon: "❌" });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ตารางสินค้า */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          📦 รายการสินค้า
        </h2>
        {loading ? (
          <p>กำลังโหลดข้อมูลสินค้า...</p>
        ) : (
          <table className="w-full border-collapse border text-sm bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2 w-16">ลำดับ</th>
                <th className="border p-2">ID</th>
                <th className="border p-2">ชื่อสินค้า</th>
                <th className="border p-2">ราคา</th>
                <th className="border p-2">สต็อก</th>
                <th className="border p-2">รูปภาพ</th>
                <th className="border p-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50 text-center">
                  <td className="border p-2">{page * 10 + index + 1}</td>
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2 text-left">{p.name}</td>
                  <td className="border p-2">{p.price.toLocaleString()} บาท</td>
                  <td className="border p-2">{p.stock}</td>
                  <td className="border p-2">
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={page === 0}
          onClick={() => {
            const newPage = Math.max(page - 1, 0);
            setPage(newPage);
            loadProducts(newPage);
          }}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          ก่อนหน้า
        </button>
        <span>
          หน้า {page + 1} จาก {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => {
            const newPage = Math.min(page + 1, totalPages - 1);
            setPage(newPage);
            loadProducts(newPage);
          }}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
