import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Logo from "@/components/common/Logo";
import FooterContainer from "@/components/containers/FooterContainer";
import StartContainer from "@/components/containers/StartContainer";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { getRandomNumber } from "@/helper";
import { logoTexts } from "@/constants/initialValues";
import ThreeDotsLoader from "@/components/animation/ThreeDotsLoader";

const HeartImage = require("@/assets/images/heart.png");

export default function Start() {
  const [progress, setProgress] = useState(0);
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    setRandomText(logoTexts[getRandomNumber()]);
  }, []);

  const router = useRouter();

  useEffect(() => {
    let startTime = Date.now();
    let interval = setInterval(() => {
      let elapsed = (Date.now() - startTime) / 5000;
      setProgress(elapsed >= 1 ? 1 : elapsed);
      if (elapsed >= 1) {
        clearInterval(interval);
        router.push("/auth/signup");
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <StartContainer>
      <ScreenTransition animationKey={0} direction="enter">
        <View className="min-h-screen relative w-full flex flex-col items-center justify-center">
          <Logo />
          {/* Progress Bar Fixed to Bottom */}
          <FooterContainer bottom={20}>
            <View>
              <Text className="font-sans text-[#EA4C7C] font-semibold">
                {(progress * 100).toFixed(0)}%
              </Text>
            </View>
            <View className="">
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
            <View className="flex flex-row items-center justify-center mt-4">
              <Text className="font-sans text-xs text-[#EA4C7C]">
                {randomText}
              </Text>
              <ThreeDotsLoader />
            </View>
          </FooterContainer>
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
