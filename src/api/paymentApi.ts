import api from "./axios";

export interface CreatePaymentIntentRequest {
  orderId: number;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (
  data: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> => {
  try {
    const response = await api.post("/payments/create-intent", data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};
