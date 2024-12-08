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
import { CAttackEffect } from "./CAttackEffect";

type CPokemonProps = ViewProps & {
  specie: number,
  opponent?: boolean,
  trigger?: boolean,
  action?: string
};


export function CPokemon({specie, opponent, trigger, action, style}: CPokemonProps) {
  const backSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${specie}.png`;
  const frontSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specie}.png`;
  const sprite = opponent ? frontSprite : backSprite;
  const pokedata = require("@/assets/data/pokedata.json");
  const yPos = useSharedValue(0);
  const yAttack = useSharedValue(0);
  const offset = pokedata[specie].height < 10 ? 30 : 0;

  const animStyle = useAnimatedStyle(() => ({
    transform: [{translateY: yPos.value }, {translateY: yAttack.value}],
  }));

  const startAnim = () => {
    const delay = opponent ? 900 : 0;
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
    switch (action) {
      case "attack": attackAnim();
    }
  }, [trigger]);

  return(
    <View style={[styles.continer, style]}>
      <View style={styles.shadow} />
        <Animated.View style={animStyle}>
          <Image source={sprite} style={[styles.image, { transform: [{translateY: offset}] }]} />
        </Animated.View>
      <CAttackEffect trigger={trigger} />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: "center"
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
