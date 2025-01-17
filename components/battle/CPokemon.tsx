import { randint } from "@/utils/randint";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence
} from "react-native-reanimated";
import { playSound } from "@/utils/sounds/playSound";

type CPokemonProps = ViewProps & {
  specie: number,
  wild?: boolean,
  state: string,
  trigger: number,
  hp: number,
  battleFlag: boolean
};


export function CPokemon({children, specie, state, wild, trigger, hp, battleFlag, style}: CPokemonProps) {
  const backSprite = () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${specie}.png`;
  const frontSprite = () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specie}.png`;
  const missingImage = require("@/assets/images/misc/missingno.png");
  const [sprite, setSprite] = useState(wild ? frontSprite : backSprite);
  const hitBack = 20;
  const hideX = 300;
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const yCatch = useSharedValue(0);
  const xCatch = useSharedValue(0);
  const xHurt = useSharedValue(0);
  const xSwitch = useSharedValue(0);
  const yAttack = useSharedValue(0);
  const yDefeat = useSharedValue(0);
  const opacity = useSharedValue(1);
  const brightness = useSharedValue(1);
  const scale = useSharedValue(1);

  async function playCrySound() {
    const { sound } = await Audio.Sound.createAsync(
      {uri: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${specie}.ogg`}
    );

    sound.setVolumeAsync(0.3)
    await sound.playAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 10000);
  }

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: yPos.value },
      { translateY: yAttack.value },
      { translateY: yDefeat.value },
      { translateX: xPos.value },
      { translateX: xHurt.value },
      { translateX: xSwitch.value },
      { translateX: xCatch.value },
      { translateY: yCatch.value },
      { scale: scale.value }
    ],
    filter: [{ brightness: brightness.value }],
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

  const pokeballAnim = () => {
    brightness.value = 1;
    opacity.value = 1;
    xCatch.value = 0;
    yCatch.value = 0;
    scale.value = 1;

    brightness.value = withDelay(400, withTiming(100, { duration: 500 }, () => {
      scale.value = withTiming(0.5, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
      xCatch.value = withTiming(-80, { duration: 300 });
      yCatch.value = withTiming(-100, { duration: 300 });
    }));
  };

  const escapeAnim = () => {
    brightness.value = 100;
    opacity.value = 1;
    yCatch.value = 90;
    xCatch.value = 0;
    scale.value = 0;

    scale.value = withTiming(1, { duration: 500 });
    yCatch.value = withTiming(-10, { duration: 500 }, () => {
      yCatch.value = withTiming(0, { duration: 300 });
    });
    opacity.value = withTiming(1, { duration: 500 });
    brightness.value = withTiming(1, { duration: 500 });
  };

  const nextAnim = () => {
    xPos.value = withTiming(0, { duration: 200 });
    setTimeout(() => {
      playCrySound();
    }, wild ? 1000 : 0);
  };

  const catchAnim = () => {
    scale.value = 1;
    xCatch.value = 300;
    yCatch.value = 0;
    opacity.value = 1;
    brightness.value = 1;
    xCatch.value = withTiming(0, { duration: 500 });
  };

  const switchNextAnim = () => {
    xSwitch.value = 0;
    xSwitch.value = withTiming(300, { duration: 200 }, () => {
      xSwitch.value = -300;
      xSwitch.value = withDelay(1000, withTiming(0, { duration: 200 }));
    });
  };
  
  const switchPrevAnim = () => {
    xSwitch.value = 0;
    xSwitch.value = withTiming(-300, { duration: 200 }, () => {
      xSwitch.value = 500;
      xSwitch.value = withDelay(1000, withTiming(0, { duration: 200 }));
    });
  };

  useEffect(() => {
    switch(state) {
      case "pokeball": pokeballAnim(); break;
      case "catch": catchAnim(); break;
      case "escape": escapeAnim(); break;
      case "next": switchNextAnim(); break;
      case "prev": switchPrevAnim(); break;
    }
  }, [state]);

  useEffect(() => {
    hoverAnim();
  }, []);

  useEffect(() => {
    hurtAnim();
    if (hp <= 0) {
      defeatAnim();
      setTimeout(() => {
        // playSound(defeatSound);
      }, 1000);
    }
  }, [hp]);

  useEffect(() => {
    setSprite(wild ? frontSprite : backSprite);
  }, [specie]);

  useEffect(() => {
    if (battleFlag) {
      attackAnim();
      if (trigger % 4 == 0 && !wild) {
        // playSound(attackSound);
      }
    }
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
