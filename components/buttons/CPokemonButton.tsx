import { Image } from "expo-image";
import { StyleSheet, Pressable, Vibration, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CText } from "../text/CText";
import { TransparentBlack } from "@/constants/TransparentBlack";
import { ComponentProps, useState } from "react";

type Props = Omit<ComponentProps<typeof Pressable>, 'onPressIn' | 'onPressOut'> & {
  specie: number,
  level: number
};


export function CPokemonButton({specie, level, ...rest}: Props) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${specie}.png`;
  const scale = useSharedValue(1);
  const y = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: y.value }]
  }));
  
  const scaleGrow = () => {
    Vibration.vibrate(100);
    setIsPressed(true);
    scale.value = withTiming(1.3, { duration: 200 });
  };

  const scaleShrink = () => {
    setIsPressed(false);
    scale.value = withTiming(1, { duration: 200 });
  }

  return (
    <Animated.View style={animStyle}>
      <View style={styles.container}>
        <Image
          style={styles.pokemon}
          source={url}
          contentFit="contain"
        />
        {isPressed ? <CText outlined style={styles.level}>{level}</CText> : null}
      </View>
      <Pressable
      {...rest}
        style={styles.button}
        onPressIn={scaleGrow}
        onPressOut={scaleShrink}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  button: {
    height: 45,
    width: 45,
    // backgroundColor: TransparentBlack
  },
  pokemon: {
    aspectRatio: 1,
    width: "120%",
    height: "120%",
    transform: [
      {translateX: "-15%"},
      {translateY: "-25%"}
    ]
  },
  level: {
    position: "absolute",
    transform: [{translateY: "50%"}]
  }
});
