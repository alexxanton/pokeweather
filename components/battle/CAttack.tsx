import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export function CAttack() {
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xPos.value }, { translateY: yPos.value }]
  }));

  return (
    <Animated.View style={[styles.container, {opacity: opacity.value}]}>
      <Image source="" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: "100%",
    position: "absolute",
    alignSelf: "center",
  }
});
