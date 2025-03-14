import { ApiResponse, UploadImageResponse } from "@/types";
import { UPLOAD_IMAGE } from "../apis";

export const uploadImage = async (
  formData: FormData
): Promise<ApiResponse<UploadImageResponse>> => {
  console.log("form: ", formData);
  const response = await fetch(`http://192.168.0.2:5000/api${UPLOAD_IMAGE}`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.json();
};
