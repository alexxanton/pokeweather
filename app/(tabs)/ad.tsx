import { CHandleBackButton } from "@/components/battle/CHandleBackButton";
import { useData } from "@/components/CDataProvider";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function Ad() {
  const {wheelTries, setWheelTries, setSong} = useData();
  const brightness = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    filter: [{ brightness: brightness.value }]
  }));

  const fadeInAnim = () => {
    brightness.value = 0;
    brightness.value = withTiming(1, { duration: 10000, easing: Easing.exp });
  };

  useEffect(() => {
    setSong("ad");
    setWheelTries(wheelTries + 10);
    fadeInAnim();
  }, []);

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <CHandleBackButton />
      <Image source={require("@/assets/images/misc/ad.png")} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%"
  }
});
