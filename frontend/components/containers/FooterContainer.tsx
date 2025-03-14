import { View } from "react-native";

export default function FooterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View className={`w-full flex items-center`}>{children}</View>;
}
