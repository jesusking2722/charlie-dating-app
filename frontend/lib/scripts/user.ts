import { ApiResponse, User } from "@/types";
import axiosInstance from "../axiosInstance";
import { FETCH_USER_INFO } from "../apis";

export const fetchUserInfo = async (id: string): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get(FETCH_USER_INFO);
  return response.data;
};
