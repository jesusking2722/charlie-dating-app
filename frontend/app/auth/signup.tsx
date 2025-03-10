import { View, Text, Alert } from "react-native";
import Container from "@/components/containers/Container";
import Logo from "@/components/common/Logo";
import FooterContainer from "@/components/containers/FooterContainer";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import ScreenTransition from "@/components/animation/ScreenTransition";
import { signupWithEmail } from "@/lib/scripts/auth";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignupWithEmailClick = async () => {
    try {
      const response = await signupWithEmail({ email, password });
      if (response.success) {
        Alert.alert("Signup successfully");
        router.push("/auth/signin");
      } else {
        Alert.alert(response.message);
      }
    } catch (error) {
      console.log("handle signup with email error: ", error);
      throw error;
    }
  };

  const handleSignupWithGoogleClick = () => {};

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <Container>
        <Logo />
        <View className="flex flex-col items-center justify-center gap-2 mt-2 w-full px-4">
          <Text className="text-black font-semibold font-sans text-xl">
            Signup to Continue
          </Text>
          <Text className="text-gray-400 font-sans text-sm">
            Please register to continue
          </Text>
          <InputField
            placeholder="Jhon@example.com"
            icon="envelope"
            onChange={setEmail}
          />
          <InputField
            placeholder="Password"
            icon="key"
            secureTextEntry={true}
            onChange={setPassword}
          />
          <View className="h-1" />
          <Button
            type="default"
            icon="paper-plane"
            iconPosition="left"
            label="Signup with Email"
            onClick={handleSignupWithEmailClick}
          />
          <Button
            type="outline"
            icon="google"
            iconPosition="left"
            label="Signup with Google"
            onClick={handleSignupWithGoogleClick}
          />
          <Text className="text-gray-400 font-sans text-xs mt-1">
            Do you have already account?
          </Text>
          <Text className="text-gray-400 font-sans text-xs">
            If so, please login{" "}
            <Link href="/auth/signin" className="text-[#EA4C7C] underline">
              here
            </Link>
          </Text>
        </View>
        <FooterContainer bottom={10}>
          <Text className="text-xs block text-center font-sans">
            I accept all the
          </Text>
          <View className="w-full flex flex-row items-center justify-center gap-2">
            <Text className="text-[#EA4C7C] font-sans text-xs">
              Terms & Conditions
            </Text>
            <Text className="text-black font-sans text-xs">&</Text>
            <Text className="text-[#EA4C7C] font-sans text-xs">
              Privacy Policy
            </Text>
          </View>
        </FooterContainer>
      </Container>
    </ScreenTransition>
  );
}
