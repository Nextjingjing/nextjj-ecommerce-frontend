import api from "./axios";

export interface OrderProductRequestDTO {
  productId: number;
  quantity: number;
}

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

export const updateOrderItems = async (
  id: number,
  items: OrderProductRequestDTO[]
): Promise<OrderResponseDTO> => {
  const res = await api.put<OrderResponseDTO>(`/orders/${id}`, { items });
  return res.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await api.delete(`/orders/${id}`);
};

export interface CreateOrderRequestDTO {
  items: OrderProductRequestDTO[];
}

export const createOrder = async (
  request: CreateOrderRequestDTO
): Promise<OrderResponseDTO> => {
  const res = await api.post<OrderResponseDTO>("/orders", request);
  return res.data;
};