import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Logo from "@/components/common/Logo";
import StartContainer from "@/components/containers/StartContainer";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { getRandomNumber } from "@/helper";
import { logoTexts } from "@/constants/initialValues";
import ThreeDotsLoader from "@/components/animation/ThreeDotsLoader";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/components/providers/UserProvider";
import { setAuthToken } from "@/lib/axiosInstance";
import { fetchMe } from "@/lib/scripts/auth";
import { jwtDecode } from "jwt-decode";

const HeartImage = require("@/assets/images/heart.png");

export default function Start() {
  const [progress, setProgress] = useState(0);
  const [randomText, setRandomText] = useState("");

  const { checkAuthentication } = useAuth();
  const { updateUser } = useUser();

  useEffect(() => {
    setRandomText(logoTexts[getRandomNumber()]);
  }, []);

  const router = useRouter();

  useEffect(() => {
    let startTime = Date.now();
    let interval = setInterval(async () => {
      let elapsed = (Date.now() - startTime) / 5000;
      setProgress(elapsed >= 1 ? 1 : elapsed);
      if (elapsed >= 1) {
        clearInterval(interval);
        const token = await checkAuthentication();
        if (!token) {
          router.push("/auth/signin");
        } else {
          const decoded = jwtDecode(token) as any;
          const response = await fetchMe(decoded.id);
          if (response.success) {
            updateUser(response.data);
            const { data } = response;
            console.log(data);
            if (!data.verified) {
              if (data.name) {
                // router.push("/verify/kyc");
                router.push("/(tabs)");
              } else {
                if (!data.gender) {
                  router.push("/profile/create/gender");
                } else if (!data.name) {
                  router.push("/profile/create/detail");
                }
              }
            }
          } else {
            console.log("Going to sign in now");
            setAuthToken(null);
            router.push("/auth/signin");
          }
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <StartContainer>
      <ScreenTransition animationKey={0} direction="enter" pinked={true}>
        <View className="flex-1 bg-pink-200">
          <View className="flex-1 items-center justify-center">
            <Logo />
          </View>
          {/* Progress Bar Fixed to Bottom */}
          <View className="flex items-center justify-center">
            <Text className="font-sans text-[#EA4C7C] font-semibold">
              {(progress * 100).toFixed(0)}%
            </Text>
          </View>
          <View className="w-full flex items-center justify-center">
            <View className="relative">
              <Image source={HeartImage} style={styles.heartImage} />
              <Progress.Bar
                color="#f8749b"
                animated={true}
                height={15}
                borderRadius={50}
                className="relative"
                progress={progress}
                width={200}
              />
            </View>
          </View>
          <View className="flex flex-row items-center justify-center mt-4">
            <Text className="font-sans text-xs text-[#EA4C7C]">
              {randomText}
            </Text>
            <ThreeDotsLoader />
          </View>
        </View>
      </ScreenTransition>
    </StartContainer>
  );
}

const styles = StyleSheet.create({
  heartImage: {
    width: 70,
    height: 70,
    position: "absolute",
    zIndex: 50,
    bottom: -22,
    left: -15,
  },
});
