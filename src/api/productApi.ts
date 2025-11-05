import api from "./axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number | null;
}

export interface ProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const fetchProducts = async (
  page = 0,
  size = 10
): Promise<ProductResponse> => {
  try {
    const response = await api.get(`/products?page=${page}&size=${size}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: number | null;
  image?: File | null;
}

export const createProduct = async (product: ProductRequest): Promise<Product> => {
  const formData = new FormData();
  formData.append(
    "product",
    JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    })
  );
  if (product.image) {
    formData.append("image", product.image);
  }

  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: ProductRequest
): Promise<Product> => {
  const formData = new FormData();
  formData.append(
    "product",
    JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    })
  );
  if (product.image) {
    formData.append("image", product.image);
  }

  const response = await api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};