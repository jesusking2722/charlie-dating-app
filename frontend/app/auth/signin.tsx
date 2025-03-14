import { View, Text, Alert } from "react-native";
import Container from "@/components/containers/Container";
import Logo from "@/components/common/Logo";
import FooterContainer from "@/components/containers/FooterContainer";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import ScreenTransition from "@/components/animation/ScreenTransition";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { signinWithEmail } from "@/lib/scripts/auth";
import { setAuthToken } from "@/lib/axiosInstance";
import { useUser } from "@/components/providers/UserProvider";

WebBrowser.maybeCompleteAuthSession();

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  const { updateUser } = useUser();

  // Google OAuth Request
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  //   iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  //   androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  //   redirectUri: makeRedirectUri({
  //     native: "yourapp://redirect",
  //   }),
  // });

  // // Handle Google sign-in response
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     fetchUserInfo(authentication?.accessToken);
  //   }
  // }, [response]);

  // // Fetch user profile data from Google API
  // async function fetchUserInfo(token: string | undefined) {
  //   if (!token) return;

  //   try {
  //     const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const user = await res.json();
  //     setUserInfo(user);
  //     Alert.alert("Login Successful", `Welcome ${user.name}`);
  //   } catch (error) {
  //     console.error("Failed to fetch user info:", error);
  //   }
  // }

  const handleSigninWithEmailClick = async () => {
    try {
      const response = await signinWithEmail({ email, password });
      Alert.alert(response.message);
      if (response.success) {
        const { user, token } = response.data;
        updateUser(user);
        await setAuthToken(token);
        Alert.alert("Login successfully");
        router.push("/profile/create/gender");
      }
    } catch (error) {
      console.log("Handle sign in with email error: ", error);
      throw error;
    }
  };

  const handleSigninWithGoogleClick = async () => {
    // await promptAsync();
  };

  const handleForgotPasswordClick = async () => {
    Alert.alert("Forgot Password", "Redirecting to password reset.");
  };

  return (
    <ScreenTransition animationKey={0} direction="enter">
      <Container>
        <Logo />
        <View className="flex flex-col items-center justify-center gap-2 mt-2 w-full px-4">
          <Text className="text-black font-semibold font-sans text-xl">
            Sign in to Continue
          </Text>
          <Text className="text-gray-400 font-sans text-sm">
            Please login to continue
          </Text>
          <InputField
            placeholder="John@example.com"
            icon="envelope"
            onChange={setEmail}
          />
          <InputField
            placeholder="Password"
            icon="key"
            secureTextEntry={true}
            onChange={setPassword}
          />
          <Button
            type="text"
            label="Forgot password"
            onClick={handleForgotPasswordClick}
          />
          <Button
            type="default"
            icon="paper-plane"
            label="Sign in with Email"
            iconPosition="left"
            onClick={handleSigninWithEmailClick}
          />
          <Button
            type="outline"
            icon="google"
            iconPosition="left"
            label="Sign in with Google"
            onClick={handleSigninWithGoogleClick}
          />
          <Text className="text-gray-400 font-sans text-xs mt-1">
            Don't have an account?
          </Text>
          <Text className="text-gray-400 font-sans text-xs">
            If not, please register{" "}
            <Link href="/auth/signup" className="text-[#EA4C7C] underline">
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
