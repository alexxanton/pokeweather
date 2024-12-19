import { StyleSheet, View, type ViewProps } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

export function CSwipeRightHandler({children}: ViewProps) {
  const router = useRouter();

  const handleSwipeLeft = (event: any) => {
    if (event.nativeEvent.translationX > 50 && event.nativeEvent.velocityX > 0) { // Detect a left swipe
      if (router.canGoBack()) {
        router.push("..");
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipeLeft}>
      <View style={styles.container}>
        {children}
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  }
});
