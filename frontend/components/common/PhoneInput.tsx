import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICountry } from "react-native-international-phone-number";
import PhoneInput from "react-native-international-phone-number";

interface PhoneInputProps {
  placeholder?: string;
  value?: string | null;
  country: ICountry | null;
  invalid?: boolean;
  invalidText?: string;
  onChange: (val: string) => void;
  onChangeCountry: (val: ICountry) => void;
}

export default function CustomPhoneInput({
  placeholder,
  value,
  invalid,
  invalidText,
  country,
  onChange,
  onChangeCountry,
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputValue = (phoneNumber: string) => {
    setInputValue(phoneNumber);
    onChange(phoneNumber);
  };

  return (
    <View className="w-full flex flex-col gap-1">
      <PhoneInput
        onChangePhoneNumber={handleInputValue}
        selectedCountry={country}
        onChangeSelectedCountry={onChangeCountry}
        placeholder={isFocused ? "" : placeholder}
        placeholderTextColor="#a0a0a0"
        value={inputValue}
        phoneInputStyles={{
          container: {
            width: "100%",
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
          },
          input: {
            flex: 1,
            fontSize: 12,
            fontFamily: "Montserrat",
            color: isFocused ? "black" : "#a0a0a0",
            fontWeight: "bold",
          },
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
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

const styles = StyleSheet.create({
  phoneInput: {},
});
