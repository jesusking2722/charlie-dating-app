import { View } from "react-native";
import { Image } from "expo-image";

export default function Avatar({
  imgSource,
  className,
  size,
  children,
}: {
  imgSource?: string;
  className?: string;
  size: number;
  children?: React.ReactNode;
}) {
  return (
    <View
      className={`flex flex-col items-center justify-center rounded-full border border-[#EA4C7C] shadow-md shadow-pink-400 ${className}`}
      style={{ width: size, height: size }}
    >
      {imgSource ? (
        <Image
          source={{ uri: imgSource }}
          style={{ width: size - 5, height: size - 5, borderRadius: "50%" }}
        />
      ) : (
        children
      )}
    </View>
  );
}
