// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   FadeIn
// } from "react-native-reanimated";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Animated, ImageBackground, StyleSheet, View, useAnimatedValue } from "react-native";
import { useData } from "./CDataProvider";


export function CBackground({ children }: PropsWithChildren) {
  const {temp, description, hour, setDescription} = useData();
  const [image, setImage] = useState();
  const fade = useAnimatedValue(0);
  
  const imageMap = {
    "thunder": require("@/assets/images/backgrounds/storm.png"),
    "rain": require("@/assets/images/backgrounds/rain.png"),
    "night": require("@/assets/images/backgrounds/night.png"),
    "cold": require("@/assets/images/backgrounds/cold.png"),
    "hot": require("@/assets/images/backgrounds/hot.png"),
    "clear": require("@/assets/images/backgrounds/clear.png"),
    "partly": require("@/assets/images/backgrounds/partly.png"),
    "cloudy": require("@/assets/images/backgrounds/cloudy.png"),
  }

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const updateBackground = () => {
    let state = "";
    if (description.includes("thunder")) state = "thunder";
    else if (description.includes("rain") || description.includes("drizzle")) state = "rain";
    else if (hour > 19 || hour < 6) state = "night";
    else if (temp < 10) state = "cold";
    else if (temp > 35) state = "hot";
    else if (description.includes("clear")) state = "clear";
    else if (description.includes("cloud")) {
      if (description.includes("few")) {
        state = "partly";
      } else {
        state = "cloudy";
      }
    }

    const bg = state;
    setImage(imageMap[bg] || imageMap.clear)
  }

  useEffect(() => {
    fadeOut();
    updateBackground();
    fadeIn();
  }, [temp, description, hour]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, {opacity: fade}]}>
        <ImageBackground source={image} style={styles.bg}>
          {children}
        </ImageBackground>
      </Animated.View>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    paddingTop: 50,
    padding: 20
  }
});
