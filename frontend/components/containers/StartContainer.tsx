import { View } from "react-native";

export default function StartContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 flex-col items-center justify-center bg-pink-200 w-full overflow-hidden">
      {children}
    </View>
  );
}
