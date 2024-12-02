import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CDataProvider } from "@/components/CDataProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CBackground } from "@/components/containers/CBackground";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <CDataProvider>
        <CBackground>
          <StatusBar translucent backgroundColor="transparent" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: "transparent"},
              animation: "fade",
              gestureEnabled: true
            }}
          >
            <Stack.Screen name="ad" options={{animation: "slide_from_bottom"}} />
          </Stack>
        </CBackground>
      </CDataProvider>
    </GestureHandlerRootView>
  );
}
