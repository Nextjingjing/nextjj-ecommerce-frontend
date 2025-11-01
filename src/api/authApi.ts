import api from "./axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
}

export interface UserResponse {
  status: string;
  message: string;
  username: string;
  email: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const register = async (data: RegisterRequest): Promise<UserResponse> => {
  const res = await api.post<UserResponse>("/auth/register", data);
  return res.data;
};
