import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Progress from "react-native-progress";

interface ButtonProps {
  type: "default" | "outline" | "text" | "icon";
  label?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  onClick?: (() => Promise<void>) | (() => void);
}

export default function Button({
  type,
  label,
  icon,
  iconPosition,
  disabled,
  loading,
  onClick,
}: ButtonProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  if (type === "icon") {
    return (
      <Pressable
        className="p-2"
        onTouchStart={() => setIsFocused(true)}
        onTouchEnd={() => setIsFocused(false)}
        onPress={onClick}
      >
        <FontAwesome
          name={icon}
          color={isFocused ? "#EA4C7C" : "black"}
          size={20}
        />
      </Pressable>
    );
  }

  return (
    <>
      {type === "text" ? (
        <Pressable className="" onPress={onClick}>
          <Text className="text-xs font-sans text-[#EA4C7C]">{label}</Text>
        </Pressable>
      ) : (
        <Pressable
          className={`w-full h-12 rounded-md flex flex-row items-center justify-center gap-2 border border-[#EA4C7C] transition-all ease-in-out duration-300 ${
            disabled || loading
              ? "bg-gray-300 text-[#a0a0a0] border-[#a0a0a0]"
              : (type === "default" && isFocused) ||
                (type === "outline" && !isFocused)
              ? "bg-white"
              : (type === "default" && !isFocused) ||
                (type === "outline" && isFocused)
              ? "bg-[#EA4C7C]"
              : "bg-white"
          }`}
          onTouchStart={
            !disabled || !loading ? () => setIsFocused(true) : undefined
          }
          onTouchEnd={
            !disabled || !loading ? () => setIsFocused(false) : undefined
          }
          onPress={onClick}
          disabled={disabled || loading}
        >
          {iconPosition === "left" && !loading && (
            <FontAwesome
              name={icon}
              size={15}
              color={
                disabled || loading
                  ? "#a0a0a0"
                  : (type === "default" && isFocused) ||
                    (type === "outline" && !isFocused)
                  ? "#EA4C7C"
                  : (type === "default" && !isFocused) ||
                    (type === "outline" && isFocused)
                  ? "white"
                  : "#EA4C7C"
              }
            />
          )}
          {iconPosition === "left" && loading && <Progress.Circle animated />}
          <Text
            className={`text-sm font-sans transition-all ease-in-out duration-300 ${
              disabled || loading
                ? "text-[#a0a0a0]"
                : (type === "default" && isFocused) ||
                  (type === "outline" && !isFocused)
                ? "text-[#EA4C7C]"
                : (type === "default" && !isFocused) ||
                  (type === "outline" && isFocused)
                ? "text-white"
                : "text-white"
            }`}
          >
            {label}
          </Text>
          {iconPosition === "right" && !loading && (
            <FontAwesome
              name={icon}
              size={15}
              color={
                disabled || loading
                  ? "#a0a0a0"
                  : (type === "default" && isFocused) ||
                    (type === "outline" && !isFocused)
                  ? "#EA4C7C"
                  : (type === "default" && !isFocused) ||
                    (type === "outline" && isFocused)
                  ? "white"
                  : "#EA4C7C"
              }
            />
          )}
          {iconPosition === "right" && loading && <Progress.Circle animated />}
        </Pressable>
      )}
    </>
  );
}
