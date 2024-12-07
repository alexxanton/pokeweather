import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import { useEffect } from "react";

type CAttackEffectProps = {
  trigger?: boolean
}

export function CAttackEffect({trigger}: CAttackEffectProps) {
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const attackImage = require("@/assets/images/battle/attack.png");

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value },
      { translateY: yPos.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const effectAnim = () => {
    yPos.value = 0;
    xPos.value = 0;
    scale.value = 1;

    opacity.value = withTiming(1, { duration: 200 });
    yPos.value = withTiming(-200, { duration: 300 });
    xPos.value = withTiming(150, { duration: 300 }, () => {
      scale.value = withTiming(2, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    });
  };

  useEffect(() => {
    effectAnim();
  }, [trigger]);

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Image source={attackImage} style={styles.image} />
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
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: "100%",
  }
});
