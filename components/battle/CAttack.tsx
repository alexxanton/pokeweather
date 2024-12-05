import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

export function CAttack() {
  return (
    <Animated.View style={styles.container}>
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
    opacity: 0,
    transform: [{translateY: "100%"}],
  }
});
