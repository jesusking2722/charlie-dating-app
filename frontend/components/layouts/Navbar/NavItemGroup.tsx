import { Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export type NavItemType = {
  path: string;
  label: string;
  icon: keyof typeof FontAwesome.glyphMap;
  active: boolean;
};

interface NavItemGroupProps {
  items: NavItemType[];
  onSelect: (idx: number, value: boolean) => void;
  onClose: () => void;
}

export default function NavItemGroup({
  items,
  onSelect,
  onClose,
}: NavItemGroupProps) {
  const router = useRouter();

  return (
    <View className="w-full gap-4">
      {items.map((item, index) => (
        <Pressable
          key={index}
          className={`w-full flex flex-row items-center gap-4 p-2 transition-all duration-300 ease-in-out rounded-lg ${
            item.active ? "bg-[#e8235e]" : "bg-transparent"
          }`}
          onTouchStart={() => onSelect(index, true)}
          onTouchEnd={() => onSelect(index, false)}
          onPress={() => {
            onClose();
            router.push(item.path as any);
          }}
        >
          <FontAwesome name={item.icon} color="white" size={12} />
          <Text className="text-white font-sans font-semibold text-sm">
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
