import { View, Text } from "react-native";

interface CreateProfileContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function CreateProfileContainer({
  children,
  title,
  subtitle,
}: CreateProfileContainerProps) {
  return (
    <View className="flex-1 bg-white">
      <View className="w-full text-left p-4">
        <Text className="font-sans text-lg font-semibold text-black">
          {title}
        </Text>
        <Text className="font-sans text-sm text-gray-400 mt-1">{subtitle}</Text>
      </View>
      <View className="flex-1 justify-center items-center">{children}</View>
    </View>
  );
}
