import axiosInstance from "../axiosInstance";
import { KYC_START, KYC_FETCH_SESSION } from "../apis";
import { ApiResponse, KycResponse, KycSessionDecisionResponse } from "@/types";

export const startKycVerification = async (): Promise<
  ApiResponse<KycResponse>
> => {
  const response = await axiosInstance.get(KYC_START);
  return response.data;
};

export const fetchSessionDecision = async (
  sessionId: string
): Promise<ApiResponse<KycSessionDecisionResponse>> => {
  const response = await axiosInstance.post(KYC_FETCH_SESSION, { sessionId });
  return response.data;
};
