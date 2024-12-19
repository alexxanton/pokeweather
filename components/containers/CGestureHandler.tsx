import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";

interface CGestureHandlerProps {
  children: React.ReactNode;
  onGestureEvent?: (event: any) => void;
}

export function CGestureHandler({children, onGestureEvent}: CGestureHandlerProps) {
  const router = useRouter();

  if (!onGestureEvent) {
    onGestureEvent = (event: any) => {
      const { state } = event.nativeEvent;
      if (state === State.END) {
        if (router.canGoBack()) {
          router.push("..");
        }
      }
    };
  }

  const gestureHandler = (event: any) => {
    const { state } = event.nativeEvent;
    if (state === State.END) {
      onGestureEvent(event);
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onHandlerStateChange={gestureHandler}>
        <View style={styles.container}>
          {children}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
});
