import { Stack } from "expo-router";

export default function QuestionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
