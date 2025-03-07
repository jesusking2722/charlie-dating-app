import { useEffect, useState } from "react";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [no, setNo] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("Authorization");
        if (!token) {
          setNo(true);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname]);

  return { user, loading, no };
}
