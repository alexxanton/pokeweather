import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { randint } from "@/utils/randint";

type CAttackEffectProps = {
  trigger?: boolean
};

type EffectAnimProps = {
  startX: number;
  startY: number;
  onComplete: () => void;
};

const EffectAnim = ({startY, startX, onComplete}: EffectAnimProps) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const attackImage = require("@/assets/images/battle/attack.png");

  useEffect(() => {
    translateX.value = randint(-50, 50);
    translateY.value = randint(-50, 50);
    scale.value = 1;
    opacity.value = withTiming(1, { duration: 100 }, () => {
      scale.value = withTiming(2, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 }, () => runOnJS(onComplete)());
    });
  
    // translateY.value = withTiming(-200, { duration: 300 });
    // translateX.value = withTiming(150, { duration: 300 }, () => {
    // });
    
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));
  
  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Image source={attackImage} style={styles.image} />
    </Animated.View>
  );
};



export function CAttackEffect({trigger}: CAttackEffectProps) {
  const [effects, setEffects] = useState<{id:number, startX:number, startY:number}[]>([]);

  const startEffect = () => {
    const id = Date.now();
    setEffects((prev) => [
      ...prev,
      {id, startX: 0, startY: 0}
    ]);
  };

  const removeEffect = (id:number) => {
    setEffects((prev) => prev.filter((effect) => effect.id !== id));
  };

  useEffect(() => {
    startEffect();
  }, [trigger]);

  return (
    <>
      {effects.map((effect) => (
        <EffectAnim
          key={effect.id}
          startX={effect.startX}
          startY={effect.startY}
          onComplete={() => removeEffect(effect.id)}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    position: "absolute",
    alignSelf: "center",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: "100%",
  }
});
