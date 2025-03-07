import axiosInstance from "../axiosInstance";
import { SIGNIN_WITH_EMAIL, SIGNUP_WITH_EMAIL } from "../apis";
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
