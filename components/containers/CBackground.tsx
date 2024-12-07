import { useEffect, useState, type PropsWithChildren } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import {ImageBackground, StyleSheet, View } from "react-native";
import { useData } from "../CDataProvider";


export function CBackground({ children }: PropsWithChildren) {
  const {temp, description, hour, windSpeed, setCondition} = useData();
  const [image, setImage] = useState();
  const [cover, setCover] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const fade = useSharedValue(1);
  
  const imageMap = {
    "thunder": require("@/assets/images/backgrounds/storm.png"),
    "rain": require("@/assets/images/backgrounds/rain.png"),
    "night": require("@/assets/images/backgrounds/night.png"),
    "snow": require("@/assets/images/backgrounds/snow.png"),
    "cold": require("@/assets/images/backgrounds/cold.png"),
    "hot": require("@/assets/images/backgrounds/hot.png"),
    "clear": require("@/assets/images/backgrounds/clear.png"),
    "partly": require("@/assets/images/backgrounds/partly.png"),
    "cloudy": require("@/assets/images/backgrounds/cloudy.png"),
    "windy": require("@/assets/images/backgrounds/windy.png"),
    "black": require("@/assets/images/backgrounds/black.png"),
  };

  const smoothTransition = () => {
    setCover(image);
    setTimeout(() => {
      fade.value = 1;
      updateBackground();
      fade.value = withTiming(0, {duration: 500});
    }, 200);
  };

  const updateBackground = () => {
    let state = "";
    
    if (firstTime) setFirstTime(false);
    else if (description.includes("thunder")) state = "thunder";
    else if (description.includes("rain") || description.includes("drizzle")) state = "rain";
    else if (description.includes("snow")) state = "snow";
    else if (windSpeed > 10) state = "windy";
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
    setCondition(state);
    setImage(imageMap[bg] || imageMap.black);
  }

  useEffect(() => {
    smoothTransition();
  }, [temp, description, hour, windSpeed]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bg}>
        <Animated.View style={[styles.anim, {opacity: fade}]}>
          <ImageBackground source={cover} style={[styles.cover]} />
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
