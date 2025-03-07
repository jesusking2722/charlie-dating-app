import { View } from "react-native";

export default function FooterContainer({
  children,
  bottom,
}: {
  children: React.ReactNode;
  bottom: number;
}) {
  return (
    <View
      className={`absolute px-8 ${
        bottom >= 20 ? "bottom-20" : "bottom-10"
      } w-full flex items-center`}
    >
      {children}
    </View>
  );
}
