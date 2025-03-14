import ScreenTransition from "@/components/animation/ScreenTransition";
import {
  Pressable,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import InputField from "@/components/common/InputField";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/common/Button";
import { useRouter } from "expo-router";
import Calendar from "@/components/common/Calendar";
import { useUser } from "@/components/providers/UserProvider";
import { User } from "@/types";
import Avatar from "@/components/common/Avatar";
import CustomPhoneInput from "@/components/common/PhoneInput";
import { ICountry } from "react-native-international-phone-number";
import { isValidPhoneNumber } from "react-native-international-phone-number";
import { updateMe } from "@/lib/scripts/auth";

export default function Detail() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [dateInvalid, setDateInvalid] = useState<boolean>(false);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { width } = useWindowDimensions();

  const { user, updateUser } = useUser();

  // Responsive size based on screen width
  const buttonSize = width * 0.4; // 40% of screen width
  const iconSize = buttonSize * 0.5; // Icon is 50% of button size

  const isValidInputValues = () => {
    let isValid = true;

    // Name validation
    if (!name || name.trim() === "") {
      setNameInvalid(true);
      isValid = false;
    } else {
      setNameInvalid(false);
    }

    // Date validation
    if (!date) {
      setDateInvalid(true);
      isValid = false;
    } else {
      setDateInvalid(false);
    }

    // Phone validation
    if (!phone || !selectedCountry) {
      setPhoneInvalid(true);
      isValid = false;
    } else {
      const phoneValid = isValidPhoneNumber(phone, selectedCountry.cca2 as any);
      setPhoneInvalid(!phoneValid);
      isValid = isValid && phoneValid;
    }

    return isValid;
  };

  const handleOnClick = async () => {
    const isValid = isValidInputValues();
    if (!isValid) return;
    if (!avatar) router.push("/profile/create/modal");
    try {
      setLoading(true);
      const updatingUser: User = {
        ...user,
        name,
        birthday: date ? date : undefined,
        phone: phone ? phone : undefined,
        country: selectedCountry ? selectedCountry : undefined,
      };
      const response = await updateMe(updatingUser);
      if (response.success) {
        const { data } = response;
        updateUser(data);
        Alert.alert("Profile detail saved successfully");
        console.log("profile detail: ", data);
        router.push("/verify/kyc");
      }
    } catch (error) {
      console.log("profile detail save error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { profilePics } = user as User;
    if (profilePics) {
      setAvatar(profilePics[0]);
    }
  }, []);

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <View className="w-full text-left">
        <Text className="font-sans text-lg font-semibold text-black">
          Edit Personal Details
        </Text>
        <Text className="font-sans text-sm text-gray-400 mt-1">
          Please edit your personal details
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
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
          {avatar ? (
            <Avatar imgSource={avatar} size={buttonSize} />
          ) : (
            <FontAwesome
              name="user"
              size={iconSize}
              color={isFocused ? "#EA4C7C" : "black"}
            />
          )}
        </Pressable>
        <View className="flex gap-4 w-full mt-8">
          <InputField
            placeholder="Full Name"
            icon="user"
            onChange={setName}
            invalid={nameInvalid}
            invalidText="Please input your name"
          />
          <Calendar
            placeholder="Date of birth"
            onChange={setDate}
            value={date}
            invalid={dateInvalid}
            invalidText="Please input your birthday"
          />
          <CustomPhoneInput
            placeholder="Phone number"
            value={phone}
            country={selectedCountry}
            onChangeCountry={setSelectedCountry}
            onChange={setPhone}
            invalid={phoneInvalid}
            invalidText="Please input your phone number"
          />
        </View>
      </View>
      <View className="w-full flex items-center justify-center">
        <Button
          type="default"
          label="Continue"
          icon="caret-right"
          iconPosition="right"
          onClick={handleOnClick}
          disabled={(name && date && phone ? false : true) || loading}
          loading={loading}
        />
      </View>
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
