import { useState } from "react";
import { Pressable, View, Text } from "react-native";

export type QuestionCardType = {
  label: string;
  active?: boolean;
};

interface QuestionCardGroupProps {
  items: QuestionCardType[];
  onSelect: (idx: number) => void;
}

export default function QuestionCardGroup({
  items,
  onSelect,
}: QuestionCardGroupProps) {
  return (
    <View className="w-full flex flex-col items-center gap-4">
      {items.map((item, index) => (
        <Pressable
          key={index}
          className={`w-full flex flex-row gap-2 p-4 rounded-lg transition-all duration-300 ease-in-out border ${
            item.active ? "bg-[#EA4C7C]" : "border-black/40  bg-white "
          }`}
          onPress={() => {
            onSelect(index);
          }}
        >
          <Text
            className={`text-sm transition-all duration-300 ease-in-out font-sans ${
              item.active ? "text-white font-semibold" : "text-black"
            }`}
          >
            {index + 1}.
          </Text>
          <Text
            className={`text-sm transition-all duration-300 ease-in-out font-sans ${
              item.active ? "text-white font-semibold" : "text-black"
            }`}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
