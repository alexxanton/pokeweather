import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CDataProvider } from "@/components/CDataProvider";
import { CBackground } from "@/components/containers/CBackground";
import { CMusic } from "@/components/CMusic";


export default function RootLayout() {
  return (
    <CDataProvider>
      <CBackground>
        <CMusic>
          <StatusBar translucent backgroundColor="transparent" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: "transparent"},
              animation: "fade",
              gestureEnabled: false
            }}
          >
            <Stack.Screen name="ad" options={{animation: "slide_from_bottom"}} />
          </Stack>
        </CMusic>
      </CBackground>
    </CDataProvider>
  );
}
