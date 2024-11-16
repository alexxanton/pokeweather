import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CProvider } from "@/components/CProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <CProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack screenOptions={{ headerShown: false }} />
      </CProvider>
    </GestureHandlerRootView>
  );
}
