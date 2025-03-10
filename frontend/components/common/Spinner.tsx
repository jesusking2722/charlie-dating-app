import { View } from "react-native";

export default function Spinner() {
  return (
    <View className="relative">
      <View className="border-pink-200 border-2 rounded-full w-[20px] h-[20px]"></View>
      <View className="border-pink-500 border-t-2 animate-spin rounded-full absolute left-0 top-0 w-[20px] h-[20px]"></View>
    </View>
  );
}
