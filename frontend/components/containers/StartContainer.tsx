import { View } from "react-native";

export default function StartContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="min-h-screen flex flex-col items-center justify-center bg-pink-100 w-full overflow-hidden">
      {children}
    </View>
  );
}
