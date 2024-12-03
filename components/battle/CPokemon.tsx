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
  const y = useSharedValue(0);
  const offset = pokedata[specie].height < 10 ? 30 : 0;

  const animStyle = useAnimatedStyle(() => ({
    transform: [{translateY: y.value}],
  }));

  const startAnim = () => {
    const delay = front ? 900 : 0;

    y.value = withDelay(
      delay,
      withRepeat(
        withTiming(-5, { duration: 2000 }),
        -1,
        true
      )
    );
  };

  useEffect(() => {
    startAnim();
  });

  return(
    <View style={[styles.continer, style]}>
      <View style={styles.shadow} />
      <Animated.View style={animStyle}>
        <Image source={sprite} style={[styles.image, { transform: [{translateY: offset}] }]} />
        {/* <CText>{pokedata[specie].height}</CText> */}
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
