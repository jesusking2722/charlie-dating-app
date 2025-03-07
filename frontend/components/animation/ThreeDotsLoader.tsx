import React from "react";
import { View } from "react-native";
import { MotiView, AnimatePresence } from "moti";

export default function ThreeDotsLoader() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <AnimatePresence>
        {[0, 1, 2].map((index) => (
          <MotiView
            key={index}
            from={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              type: "timing",
              duration: 500,
              delay: index * 200,
              repeat: Infinity,
            }}
            style={{
              width: 4,
              height: 4,
              backgroundColor: "#EA4C7C",
              borderRadius: 2,
              marginHorizontal: 2,
            }}
          />
        ))}
      </AnimatePresence>
    </View>
  );
}
