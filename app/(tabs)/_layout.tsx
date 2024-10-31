import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="wheel" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="missions" />
    </Tabs>
  );
}
