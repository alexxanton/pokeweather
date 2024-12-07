import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CText } from "../text/CText";
import { useEffect } from "react";

type CVarProps = ViewProps & {
  name: string,
  hp: number,
  color?: string,
  bgColor?: string
}

export function CVar({ name, hp, style, color, bgColor }: CVarProps) {
  const varHp = useSharedValue(100);
  const array = Array.from(name);
  const defaultColor = "#8BC34A";
  const defaultBgColor = "#2E6C31";
  let capitalize = true;

  if (!color || !bgColor) {
    color = defaultColor;
    bgColor = defaultBgColor;
  }

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
  
  const styles = StyleSheet.create({
    container: {
      height: 50,
    },
    border: {
      height: "100%",
      borderRadius: 35,
      borderWidth: 5,
      overflow: "hidden",
      backgroundColor: bgColor,
    },
    var: {
      backgroundColor: color,
      height: "100%",
      position: "absolute"
    },
    text: {
      position: "absolute",
      left: 10,
      transform: [{translateY: "50%"}],
    }
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.border}>
        <Animated.View style={[styles.var, animStyle]} />
        <CText outlined size={20} style={styles.text}>{pkmnName}</CText>
      </View>
    </View>
  );
}
