import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay
} from "react-native-reanimated";
import { CText } from "../text/CText";

type CPokemonProps = ViewProps & {
  specie: number,
  front?: boolean
};


export function CPokemon({specie, front, style}: CPokemonProps) {
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
    yAttack.value = withTiming(-20, { duration: 200 });
    setTimeout(() => {
      yAttack.value = withTiming(0, { duration: 200 });
    }, 200);
  };

  useEffect(() => {
    startAnim();
    setInterval(() => {
      attackAnim();
    }, 2000);
  });

  return(
    <View style={[styles.continer, style]}>
      <View style={styles.shadow} />
      <Animated.View style={animStyle}>
        <Image source={sprite} style={[styles.image, { transform: [{translateY: offset}] }]} />
      </Animated.View>
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
    width: "100%",
    height: "35%",
    borderRadius: "100%",
    bottom: 0
  },
  image: {
    aspectRatio: 1,
    width: 200,
    height: 200,
  },
});
