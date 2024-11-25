import { Image } from "expo-image";
import { StyleSheet, Pressable, Vibration } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = {
  id: number,
  key: number
};


export function CPokemonButton({id, key}: Props) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  
  const handlePress = () => {
  }

  const scaleGrow = () => {
    Vibration.vibrate(100);
    scale.value = withTiming(1.1, { duration: 100 });
  };

  const scaleShrink = () => {
    scale.value = withTiming(1, { duration: 100 });
  }

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Image
        style={styles.pokemon}
        source={url}
        contentFit="contain"
      />
      <Pressable
        style={styles.button}
        key={key}
        onPress={handlePress}
        onPressIn={scaleGrow}
        onPressOut={scaleShrink}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: "15%",
  },
  button: {
    height: 30,
    width: "100%",
    // backgroundColor:"black",
  },
  pokemon: {
    aspectRatio: 1,
    width: "400%",
    height: "400%",
    position: "absolute",
    transform: [{translateX: "-40%"}, {translateY: "-60%"}]
  },
});
