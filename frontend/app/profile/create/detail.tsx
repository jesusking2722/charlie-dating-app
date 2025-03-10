import CreateProfileContainer from "@/components/containers/CreateProfileContainer";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { Pressable, useWindowDimensions, View, StyleSheet } from "react-native";
import InputField from "@/components/common/InputField";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FooterContainer from "@/components/containers/FooterContainer";
import Button from "@/components/common/Button";
import { useRouter } from "expo-router";
import Calendar from "@/components/common/Calendar";

export default function Detail() {
  const [name, setName] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();
  const { width } = useWindowDimensions(); // Get the screen width dynamically

  // Responsive size based on screen width
  const buttonSize = width * 0.4; // 40% of screen width
  const iconSize = buttonSize * 0.5; // Icon is 50% of button size

  const handleOnClick = async () => {
    router.push("/verify/kyc");
  };

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <CreateProfileContainer
        title="Edit Personal Details"
        subtitle="Please edit your personal details"
      >
        <View className="w-full flex flex-row items-center justify-center">
          <Pressable
            style={[
              styles.button,
              isFocused ? styles.focusedButton : styles.defaultButton,
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 2,
              }, // Dynamic sizing
            ]}
            onTouchStart={() => setIsFocused(true)}
            onTouchEnd={() => setIsFocused(false)}
            onPress={() => {
              router.push("/profile/create/modal");
            }}
          >
            <FontAwesome
              name="user"
              size={iconSize}
              color={isFocused ? "#EA4C7C" : "black"}
            />
          </Pressable>
        </View>
        <View className="flex gap-4 w-full mt-8">
          <InputField placeholder="Full Name" icon="user" onChange={setName} />
          <Calendar placeholder="Date of birth" onChange={setName} />
          {/* <InputField
            placeholder="Date of birth"
            icon="calendar"
            onChange={setName}
          /> */}
          <InputField
            placeholder="Phone number"
            icon="phone"
            onChange={setName}
          />
        </View>
        <FooterContainer bottom={10}>
          <Button
            type="default"
            label="Continue"
            icon="caret-right"
            iconPosition="right"
            onClick={handleOnClick}
          />
        </FooterContainer>
      </CreateProfileContainer>
      {/* <ImageSelectModal visible={visible} onClose={() => setVisible(false)} /> */}
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    transitionDuration: "100ms",
    transitionTimingFunction: "ease-in-out",
  },
  focusedButton: {
    backgroundColor: "#f3f4f6", // bg-gray-100
    borderColor: "#EA4C7C",
    shadowColor: "#EA4C7C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  defaultButton: {
    backgroundColor: "white",
    borderColor: "#cbd5e1", // border-slate-300
  },
});
