import { useEffect } from "react";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export function useAuth() {
  const pathname = usePathname();
  const router = useRouter();

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem("Authorization");
    return token;
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname.includes("signup") || pathname.includes("signin")) {
          return;
        }
        const token = await AsyncStorage.getItem("Authorization");
        if (!token) {
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, [pathname]);

  return { checkAuthentication };
}
