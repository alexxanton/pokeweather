import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay
} from "react-native-reanimated";
import { CEffect } from "./CEffect";
import { CAttack } from "./CAttack";

type CPokemonProps = ViewProps & {
  specie: number,
  front?: boolean,
  trigger?: boolean
};


export function CPokemon({specie, front, trigger, style}: CPokemonProps) {
  const backSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${specie}.png`;
  const frontSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specie}.png`;
  const sprite = front ? frontSprite : backSprite;
  const pokedata = require("@/assets/data/pokedata.json");
  const yPos = useSharedValue(0);
  const yAttack = useSharedValue(0);
  const offset = pokedata[specie].height < 10 ? 30 : 0;

  const animStyle = useAnimatedStyle(() => ({
    transform: [{translateY: yPos.value }, {translateY: yAttack.value}],
  }));

  const startAnim = () => {
    const delay = front ? 900 : 0;
    yPos.value = withDelay(
      delay,
      withRepeat(
        withTiming(-5, { duration: 2000 }),
        -1,
        true
      )
    );
  };

  const attackAnim = () => {
    yAttack.value = withTiming(-20, { duration: 100 }, () => {
      yAttack.value = withTiming(0, { duration: 100 });
    });
  };

  useEffect(() => {
    startAnim();
  }, []);

  useEffect(() => {
    attackAnim();
  }, [trigger]);

  return(
    <View style={[styles.continer, style]}>
      <View style={styles.shadow} />
      <Animated.View style={animStyle}>
        <Image source={sprite} style={[styles.image, { transform: [{translateY: offset}] }]} />
      </Animated.View>
      <CAttack />
      <CEffect />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  shadow: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.3,
    width: "75%",
    height: "35%",
    borderRadius: "100%",
    bottom: 0,
    alignSelf: "center"
  },
  image: {
    aspectRatio: 1,
    width: 200,
    height: 200,
  },
});
