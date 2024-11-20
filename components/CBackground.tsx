import { useEffect, useState, type PropsWithChildren } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import {ImageBackground, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useData } from "./CDataProvider";
import { CText } from "./CText";


export function CBackground({ children }: PropsWithChildren) {
  const {temp, description, hour, setDescription} = useData();
  const [image, setImage] = useState();
  const [cover, setCover] = useState();
  const fade = useSharedValue(1);
  
  const imageMap = {
    "thunder": require("@/assets/images/backgrounds/storm.png"),
    "rain": require("@/assets/images/backgrounds/rain.png"),
    "night": require("@/assets/images/backgrounds/night.png"),
    "cold": require("@/assets/images/backgrounds/cold.png"),
    "hot": require("@/assets/images/backgrounds/hot.png"),
    "clear": require("@/assets/images/backgrounds/clear.png"),
    "partly": require("@/assets/images/backgrounds/partly.png"),
    "cloudy": require("@/assets/images/backgrounds/cloudy.png"),
    "black": require("@/assets/images/backgrounds/black.png"),
  }

  const smoothTransition = () => {
    setCover(image);
    setTimeout(() => {
      fade.value = 1;
      updateBackground();
      fade.value = withTiming(0, {duration: 500});
    }, 100);
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
    setImage(imageMap[bg] || imageMap.black)
  }

  useEffect(() => {
    
    smoothTransition();
  }, [temp, description, hour]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bg}>
        <Animated.View style={[styles.anim, {opacity: fade}]}>
          <Image source={cover} style={[styles.cover]} />
        </Animated.View>
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181414",
  },
  bg: {
    flex: 1,
    paddingTop: 50,
    padding: 20
  },
  anim: {
    ...StyleSheet.absoluteFillObject,
  },
  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});
