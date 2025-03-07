import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.136.210:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to Attach Token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("Authorization"); // Get token from storage
      if (token) {
        config.headers["Authorization"] = token;
      }
    } catch (error) {
      console.error("Error retrieving auth token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to Set or Remove Auth Token
export const setAuthToken = async (token: string | null) => {
  try {
    if (token) {
      await AsyncStorage.setItem("Authorization", token);
      axiosInstance.defaults.headers.common["Authorization"] = token;
    } else {
      await AsyncStorage.removeItem("Authorization");
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

export default axiosInstance;
