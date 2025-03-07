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
    <View className="w-full min-h-screen p-8 relative flex flex-col items-center justify-center overflow-hidden bg-white">
      <View className="w-full text-left absolute top-10 left-10">
        <Text className="font-sans text-lg font-semibold text-black">
          {title}
        </Text>
        <Text className="font-sans text-sm text-gray-400 mt-1">{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}
