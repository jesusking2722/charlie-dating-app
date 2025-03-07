import { View } from "react-native";
import CreateProfileContainer from "@/components/containers/CreateProfileContainer";
import GenderSelect from "@/components/common/GenderSelect";
import type { Gender } from "@/components/common/GenderSelect";
import FooterContainer from "@/components/containers/FooterContainer";
import Button from "@/components/common/Button";
import { useState } from "react";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { Link, useRouter } from "expo-router";

export default function Gender() {
  const [gender, setGender] = useState<Gender | null>(null);
  const router = useRouter();

  const handleOnSelect = (gdr: Gender) => setGender(gdr);

  const handleOnClick = () => {
    router.push("/profile/create/detail");
  };

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <CreateProfileContainer
        title="Select Gender"
        subtitle="Please select your gender"
      >
        <GenderSelect onSelect={handleOnSelect} />
        <FooterContainer bottom={10}>
          <Button
            type="default"
            label="Continue"
            icon="caret-right"
            iconPosition="right"
            disabled={!gender}
            onClick={handleOnClick}
          />
        </FooterContainer>
      </CreateProfileContainer>
    </ScreenTransition>
  );
}
