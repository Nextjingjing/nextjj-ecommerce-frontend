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
