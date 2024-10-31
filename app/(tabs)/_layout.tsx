import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="wheel" />
      <Stack.Screen name="index" />
      <Stack.Screen name="missions" />
    </Stack>
  );
}
