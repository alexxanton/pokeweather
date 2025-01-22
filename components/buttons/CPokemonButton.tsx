import { Image } from "expo-image";
import { StyleSheet, Pressable, Vibration, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CText } from "../text/CText";
import { TransparentBlack } from "@/constants/TransparentBlack";
import { ComponentProps, useState } from "react";

type Props = Omit<ComponentProps<typeof Pressable>, 'onPressIn' | 'onPressOut'> & {
  specie: number,
  level: number,
  isOnTeam?: boolean,
  onPressIn?: () => void,
  onPressOut?: () => void,
};


export function CPokemonButton({specie, level, isOnTeam, onPressIn, onPressOut, ...rest}: Props) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${specie}.png`;
  const scale = useSharedValue(1);
  const y = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: y.value }]
  }));
  
  const scaleGrow = () => {
    Vibration.vibrate(100);
    scale.value = withTiming(1.3, { duration: 200 });
    if (onPressIn) {
      onPressIn();
    }
  }

  const scaleShrink = () => {
    scale.value = withTiming(1, { duration: 200 });
    if (onPressOut) {
      onPressOut();
    }
  }

  return (
    <Animated.View style={animStyle}>
      <View style={styles.container}>
        <Image
          style={[styles.pokemon, { opacity: isOnTeam ? 0.2 : 1 }]}
          source={url}
          contentFit="contain"
        />
      </View>
      {isOnTeam ?? <CText outlined style={styles.level}>{level}</CText>}
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
    transform: [{translateY: "-50%"}]
  }
});
