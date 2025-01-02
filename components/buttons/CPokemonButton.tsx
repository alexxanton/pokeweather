import { Image } from "expo-image";
import { StyleSheet, Pressable, Vibration, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CText } from "../text/CText";
import { TransparentBlack } from "@/constants/TransparentBlack";
import { useState } from "react";

type Props =  {
  specie: number,
  level: number
};


export function CPokemonButton({specie, level}: Props) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${specie}.png`;
  const scale = useSharedValue(1);
  const y = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: y.value }]
  }));
  
  const handlePress = () => {
  }

  const scaleGrow = () => {
    Vibration.vibrate(100);
    setIsPressed(true);
    scale.value = withTiming(1.3, { duration: 200 });
    y.value = withTiming(-20, { duration: 200 })
  };

  const scaleShrink = () => {
    setIsPressed(false);
    scale.value = withTiming(1, { duration: 200 });
    y.value = withTiming(1, { duration: 200 })
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
        style={styles.button}
        onPress={handlePress}
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
