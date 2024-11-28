import { Image } from "expo-image";
import { StyleSheet, Pressable, Vibration, type ViewProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = ViewProps & {
  specie: number,
};


export function CPokemonButton({specie, ...rest}: Props) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${specie}.png`;
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  
  const handlePress = () => {
  }

  const scaleGrow = () => {
    Vibration.vibrate(100);
    scale.value = withTiming(1.3, { duration: 200 });
  };

  const scaleShrink = () => {
    scale.value = withTiming(1, { duration: 200 });
  }

  return (
    <Animated.View style={[styles.container, animStyle]} {...rest}>
      <Image
        style={styles.pokemon}
        source={url}
        contentFit="contain"
      />
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
    height: 30,
    width: 50,
    marginBottom: 30,
    // backgroundColor:"black",
  },
  button: {
    height: 60,
    // backgroundColor:"#000000AA",
  },
  pokemon: {
    aspectRatio: 1,
    width: "200%",
    height: "200%",
    position: "absolute",
    transform: [{translateX: "-25%"}, {translateY: "-10%"}],
  },
});
