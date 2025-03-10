import ScreenTransition from "@/components/animation/ScreenTransition";
import Button from "@/components/common/Button";
import QuestionCardGroup from "@/components/common/QuestionCardGroup";
import type { QuestionCardType } from "@/components/common/QuestionCardGroup";
import CreateProfileContainer from "@/components/containers/CreateProfileContainer";
import FooterContainer from "@/components/containers/FooterContainer";
import { MAIN_QUESTIONS } from "@/constants/initialValues";
import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function Main() {
  const [questions, setQuestions] =
    useState<QuestionCardType[]>(MAIN_QUESTIONS);
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  const handleQuestionSelect = (idx: number) => {
    const updated = questions.map((question, index) => {
      if (idx === index) {
        return { ...question, active: true };
      } else {
        return { ...question, active: false };
      }
    });
    setQuestions(updated);
    setSelected(idx);
  };

  const handleContinueClick = () => {
    router.push("/(tabs)");
  };

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <CreateProfileContainer
        title="Your prefered level of commitment"
        subtitle="Please choose your prefered level of commitment"
      >
        <View className="w-full px-8">
          <QuestionCardGroup
            items={questions}
            onSelect={handleQuestionSelect}
          />
        </View>
        <FooterContainer bottom={10}>
          <Button
            type="default"
            label="Continue"
            icon="caret-right"
            iconPosition="right"
            onClick={handleContinueClick}
            disabled={selected ? false : true}
          />
        </FooterContainer>
      </CreateProfileContainer>
    </ScreenTransition>
  );
}
