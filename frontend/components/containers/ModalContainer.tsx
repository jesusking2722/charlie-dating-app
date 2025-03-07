import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { MotiView } from "moti";

const { height } = Dimensions.get("window");

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50 overflow-x-hidden overflow-y-scroll">
      <MotiView
        from={{ translateY: height / 2 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: height / 2 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
        }}
        className="w-4/5 bg-white p-5 rounded-2xl items-center"
      >
        {children}
      </MotiView>
    </View>
  );
}
