import { View, TextInput, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

interface InputFieldProps {
  placeholder?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  value?: any;
  secureTextEntry?: boolean;
  invalid?: boolean;
  invalidText?: string;
  onChange: (val: string) => void;
}

export default function InputField({
  placeholder,
  icon,
  value,
  secureTextEntry,
  invalid,
  invalidText,
  onChange,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full flex flex-col gap-1">
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          paddingHorizontal: 12,
          paddingVertical: 2,
          borderRadius: 6,
          borderColor: isFocused ? "#EA4C7C" : "#a0a0a0",
          backgroundColor: "white",

          // Proper shadow styles for iOS
          shadowColor: "#EA4C7C",
          shadowOffset: { width: 12, height: 12 },
          shadowOpacity: isFocused ? 1 : 0,
          shadowRadius: 4,

          // Elevation for Android (because shadow props don’t work on Android)
          elevation: isFocused ? 10 : 0,
        }}
      >
        <FontAwesome
          name={icon}
          size={15}
          color={isFocused ? "#EA4C7C" : "#a0a0a0"}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 8,
            fontSize: 12,
            fontFamily: "Montserrat",
            color: isFocused ? "black" : "#a0a0a0",
            borderWidth: 0,
            outlineColor: "white",
            fontWeight: "bold",
          }}
          placeholder={isFocused ? "" : placeholder}
          placeholderTextColor="#a0a0a0"
          value={value}
          secureTextEntry={secureTextEntry}
          cursorColor="black"
          onChangeText={(val) => onChange(val)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {invalid && invalidText && (
        <Text
          className="text-red-500 font-semibold"
          style={{ fontFamily: "Montserrat" }}
        >
          {invalidText}
        </Text>
      )}
    </View>
  );
}
