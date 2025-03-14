import axiosInstance from "../axiosInstance";
import {
  FETCH_ME,
  SIGNIN_WITH_EMAIL,
  SIGNUP_WITH_EMAIL,
  UPDATE_ME,
} from "../apis";
import { User, ApiResponse, AuthResponse } from "@/types";

export const signupWithEmail = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await axiosInstance.post(SIGNUP_WITH_EMAIL, user);
    return response.data;
  } catch (error) {
    console.log("Failed to sign up with email: ", error);
    throw error;
  }
};

export const signinWithEmail = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await axiosInstance.post(SIGNIN_WITH_EMAIL, user);
    return response.data;
  } catch (error) {
    console.log("Failed to sign in with email: ", error);
    throw error;
  }
};

export const fetchMe = async (id: string): Promise<ApiResponse<User>> => {
  console.log("my id: ", FETCH_ME + id);
  const response = await axiosInstance.get(FETCH_ME + id);
  return response.data;
};

export const updateMe = async (user: User): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.patch(UPDATE_ME, user);
  return response.data;
};
