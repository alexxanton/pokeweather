import { randint } from "@/utils/randint";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence
} from "react-native-reanimated";

type CPokemonProps = ViewProps & {
  specie: number,
  wild?: boolean,
  trigger: boolean,
  hp: number
};


export function CPokemon({children, specie, wild, trigger, hp, style}: CPokemonProps) {
  const backSprite = () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${specie}.png`;
  const frontSprite = () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specie}.png`;
  const missingImage = require("@/assets/images/misc/missingno.png");
  const [sprite, setSprite] = useState(wild ? frontSprite : backSprite);
  const hitBack = 20;
  const hideX = 200;
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const xHurt = useSharedValue(0);
  const yAttack = useSharedValue(0);
  const yDefeat = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: yPos.value},
      {translateY: yAttack.value},
      {translateY: yDefeat.value},
      {translateX: xPos.value},
      {translateX: xHurt.value},
    ],
    opacity: opacity.value,
  }));

  const hoverAnim = () => {
    const delay = wild ? 900 : 0;
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

  const hurtAnim = () => {
    xHurt.value = 0;
    xHurt.value = withSequence(
      withTiming(wild ? hitBack : -hitBack, { duration: 200 }),
      withTiming(0, { duration: 200 })
    );
  };

  const defeatAnim = () => {
    yDefeat.value = 0;
    xPos.value = 0;
    opacity.value = 1;

    setTimeout(() => {
      yDefeat.value = withTiming(200, { duration: 500 });
      opacity.value = withTiming(0, { duration: 250 }, () => {
        opacity.value = 1;
        xPos.value = wild ? hideX : -hideX;
        yDefeat.value = 0;
      });
    }, 1000);
  };

  const nextAnim = () => {
    xPos.value = withTiming(0, { duration: 200 });
  };

  const leftAnim = () => {};
  
  const rightAnim = () => {};

  useEffect(() => {
    hoverAnim();
  }, []);

  useEffect(() => {
    hurtAnim();
    if (hp <= 0) {
      defeatAnim();
    }
  }, [hp]);

  useEffect(() => {
    setSprite(wild ? frontSprite : backSprite);
  }, [specie]);

  useEffect(() => {
    attackAnim();
  }, [trigger]);

  return(
    <View style={[styles.continer, style]}>
      <View style={styles.shadow} />
      <Animated.View style={animStyle}>
        <Image source={sprite} style={styles.image}
          onError={() => setSprite(missingImage)}
          onLoad={nextAnim}
        />
      </Animated.View>
      {children}
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
    height: "15%",
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
