import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CText } from "../text/CText";
import { useEffect } from "react";

type CVarProps = {
  name: string,
  hp: number
}

export function CVar({ name, hp }: CVarProps) {
  const varHp = useSharedValue(100);
  const array = Array.from(name);
  let capitalize = true;

  const pkmnName = array.map((letter) => {
    if (capitalize) {
      capitalize = false;
      return letter.toUpperCase();
    }
    
    if (letter == " " || letter == "-") {
      capitalize = true;
    }
    return letter;
  }).join("");
  
  const animStyle = useAnimatedStyle(() => ({
    width: `${varHp.value}%`,
  }));

  const varAnim = () => {
    varHp.value = withTiming(hp, { duration: 200 });
  };

  useEffect(() => {
    varAnim();
  }, [hp]);
  
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Animated.View style={[styles.var, animStyle]} />
        <CText outlined size={20} style={styles.text}>{pkmnName}</CText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "7%",
  },
  border: {
    height: "100%",
    borderRadius: 35,
    borderWidth: 5,
    overflow: "hidden",
    backgroundColor: "#2E6C31",
  },
  var: {
    backgroundColor: "#8BC34A",
    height: "100%",
    position: "absolute"
  },
  text: {
    position: "absolute",
    left: 10,
    transform: [{translateY: "50%"}],
  }
});
