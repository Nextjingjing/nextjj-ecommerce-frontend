import api from "./axios";

export interface UserInfoResponse {
  userId: number;
  address: string;
  tel: string;
  fname: string;
  lname: string;
}

export interface UserUpdateRequest {
  address: string;
  tel: string;
  fname: string;
  lname: string;
}

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  const res = await api.get<UserInfoResponse>("/users/info");
  return res.data;
};

export const updateUserInfo = async (
  data: UserUpdateRequest
): Promise<UserInfoResponse> => {
  const res = await api.put<UserInfoResponse>("/users", data);
  return res.data;
};
