import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CDataProvider } from "@/components/CDataProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <CDataProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack screenOptions={{ headerShown: false }} />
      </CDataProvider>
    </GestureHandlerRootView>
  );
}
