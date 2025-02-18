import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { randint } from "@/utils/randint";
import { attackSprites } from "@/utils/battleFunctions/attackSpritesMap";

export type AttackType = keyof typeof attackSprites;

type CAttackEffectProps = {
  trigger: number,
  type: AttackType
  index?: number,
  battleFlag: boolean,
}

export function CAttackEffect({trigger, type, index, battleFlag}: CAttackEffectProps) {
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const attackImage = attackSprites[type];

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value },
      { translateY: yPos.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const effectAnim = () => {
    xPos.value = randint(-50, 50);
    yPos.value = randint(-50, 50);
    scale.value = 1;
    opacity.value = withTiming(1, { duration: 100 }, () => {
      scale.value = withTiming(1.5, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    });
  };

  useEffect(() => {
    if (trigger === index) {
      if (battleFlag) {
        effectAnim();
      }
    }
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
    position: "absolute",
    alignSelf: "center",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: "100%",
  }
});
