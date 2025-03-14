import { View, Text } from "react-native";
import GenderSelect from "@/components/common/GenderSelect";
import type { Gender } from "@/components/common/GenderSelect";
import Button from "@/components/common/Button";
import { useState } from "react";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { useRouter } from "expo-router";
import { useUser } from "@/components/providers/UserProvider";
import { updateMe } from "@/lib/scripts/auth";
import { User } from "@/types";

export default function Gender() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, updateUser } = useUser();

  const handleOnSelect = (gdr: Gender) => setGender(gdr);

  const handleOnClick = async () => {
    try {
      console.log(gender);
      if (gender) {
        setLoading(true);
        const updating: User = {
          ...user,
          gender,
        };
        const response = await updateMe(updating);
        if (response.success) {
          updateUser(response.data);
          router.push("/profile/create/detail");
        }
      }
    } catch (error) {
      console.log("update gender error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <View className="w-full text-left">
        <Text className="font-sans text-lg font-semibold text-black">
          Select Gender
        </Text>
        <Text className="font-sans text-sm text-gray-400 mt-1">
          Please select your gender
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <GenderSelect onSelect={handleOnSelect} />
      </View>
      <View className="w-full flex items-center justify-center">
        <Button
          type="default"
          label="Continue"
          icon="caret-right"
          iconPosition="right"
          disabled={!gender || loading}
          loading={loading}
          onClick={handleOnClick}
        />
      </View>
    </ScreenTransition>
  );
}
