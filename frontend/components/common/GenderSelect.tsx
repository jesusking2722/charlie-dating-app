import { View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

export type Gender = "male" | "female";

export default function GenderSelect({
  onSelect,
}: {
  onSelect: (gender: Gender) => void;
}) {
  const [isMaleFocused, setIsMaleFocused] = useState<boolean>(false);
  const [isFemaleFocused, setIsFemaleFocused] = useState<boolean>(false);

  const handleMaleOnPress = (gender: Gender) => {
    if (gender === "male") {
      setIsMaleFocused(true);
      setIsFemaleFocused(false);
      onSelect("male");
    } else {
      setIsFemaleFocused(true);
      setIsMaleFocused(false);
      onSelect("female");
    }
  };

  return (
    <View className="flex gap-12">
      <Pressable
        className={`w-40 h-40 flex flex-col items-center justify-center rounded-lg border transition-all ease-in-out duration-300 ${
          isMaleFocused ? "border-[#EA4C7C] bg-gray-100" : "border-slate-300"
        }`}
        onPress={() => handleMaleOnPress("male")}
      >
        <FontAwesome
          name="male"
          size={50}
          color={isMaleFocused ? "#EA4C7C" : "black"}
        />
        <Text
          className={`font-sans text-lg ${
            isMaleFocused ? "text-[#EA4C7C]" : "text-black"
          }`}
        >
          Male
        </Text>
      </Pressable>
      <Pressable
        className={`w-40 h-40 flex flex-col items-center justify-center rounded-lg border transition-all ease-in-out duration-300 ${
          isFemaleFocused ? "border-[#EA4C7C] bg-gray-100" : "border-slate-300"
        }`}
        onPress={() => handleMaleOnPress("female")}
      >
        <FontAwesome
          name="female"
          size={50}
          color={isFemaleFocused ? "#EA4C7C" : "black"}
        />
        <Text
          className={`font-sans text-lg ${
            isFemaleFocused ? "text-[#EA4C7C]" : "text-black"
          }`}
        >
          Female
        </Text>
      </Pressable>
    </View>
  );
}
