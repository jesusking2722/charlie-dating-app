import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import InfiniteScalingView from "../animation/InfiniteScalingView";

const LogoImage = require("@/assets/images/logo.png");

export default function Logo() {
  return (
    <View className="w-full">
      <InfiniteScalingView>
        <View className="flex items-center justify-center w-full">
          <Image source={LogoImage} style={styles.logoImage} />
        </View>
      </InfiniteScalingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 100,
    height: 100,
  },
});
