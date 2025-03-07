import { Stack } from "expo-router";

export default function VerifyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="kyc" />
    </Stack>
  );
}
