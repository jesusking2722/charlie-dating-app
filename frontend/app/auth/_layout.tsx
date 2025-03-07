import { Stack } from "expo-router";

export default function AuthRouter() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup" />
      <Stack.Screen name="signin" />
    </Stack>
  );
}
