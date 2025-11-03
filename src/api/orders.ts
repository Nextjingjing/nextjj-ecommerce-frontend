import api from "./axios";

export interface OrderProductResponseDTO {
  productId: number;
  productName: string;
  quantity: number;
  pricePerUnit: number;
}

export interface OrderResponseDTO {
  id: number;
  orderDate: string;
  totalAmount: number;
  userId: number;
  items: OrderProductResponseDTO[];
  status: string;
}

export interface PagedOrderResponse {
  content: OrderResponseDTO[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const getOrders = async (): Promise<PagedOrderResponse> => {
  const res = await api.get<PagedOrderResponse>("/orders/my-orders");
  return res.data;
};
