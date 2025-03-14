import ScreenTransition from "@/components/animation/ScreenTransition";
import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useState } from "react";
import { Image } from "expo-image";

const Avatar = require("@/assets/images/avatar.png");

export default function Home() {
  const [search, setSearch] = useState<string | null>(null);

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-4 rounded-lg">
          <FontAwesome
            name="map-marker"
            color="#EA4C7C"
            size={20}
            className="py-2 px-3 bg-pink-200 rounded-xl"
          />
          <View className="gap-1">
            <Text className="font-bold font-sans text-black">Location</Text>
            <Text
              className="font-semibold text-black"
              style={{ fontFamily: "Montserrat" }}
            >
              United Kingdom, London
            </Text>
          </View>
        </View>
        <Button type="icon" icon="bell" />
      </View>
      <View className="flex flex-row items-center justify-between mt-4 gap-4">
        <View className="flex-1">
          <InputField
            placeholder="Search"
            value={search}
            onChange={setSearch}
            icon="search"
          />
        </View>
        <Button type="icon" iconType="primary" icon="sliders" />
      </View>
      <View className="flex-1 relative rounded-xl mt-4">
        <Image source={Avatar} style={styles.image} />
      </View>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 20,
  },
});
