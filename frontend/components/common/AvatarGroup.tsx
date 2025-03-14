import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

interface AvatarGroupProps {
  avatars: string[]; // Array of avatar image URLs
  max?: number; // Max avatars to display before showing "+X"
  size?: number; // Avatar size
  spacing?: number; // Spacing between avatars
}

export default function AvatarGroup({
  avatars,
  max = 4,
  size = 60,
  spacing = -15,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const extraCount = avatars.length - max;

  return (
    <View className="flex flex-row items-center">
      {visibleAvatars.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          className="rounded-full border-2 border-white shadow-md shadow-pink-400"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2, // Ensure circular shape
            overflow: "hidden", // Clip image to circle
            marginLeft: index === 0 ? 0 : spacing,
          }}
        />
      ))}

      {extraCount > 0 && (
        <View
          className="rounded-full bg-[#EA4C7C] border-2 border-white flex items-center justify-center"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            marginLeft: spacing,
          }}
        >
          <Text className="text-white font-semibold font-sans">{`+${extraCount}`}</Text>
        </View>
      )}
    </View>
  );
}
