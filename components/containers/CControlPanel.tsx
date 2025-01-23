import { StyleSheet, View } from "react-native";
import { type ViewProps } from "react-native";
import { CLabel } from "../text/CLabel";
import { CVar } from "../battle/CVar";
import { TransparentBlack } from "@/constants/TransparentBlack";
import { CText } from "../text/CText";
import { useData } from "../CDataProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { DATABASE_SERVER_URI } from "@/constants/URI";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { playSound } from "@/utils/sounds/playSound";


export function CControlPanel({children, style, ...rest}: ViewProps) {
  const {coins, boost, setBoost, sounds, userId} = useData();
  const yPos = useSharedValue(0);
  const xPos = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [lastCoinValue, setLastCoinValue] = useState(coins);
  const [coinDifference, setCoinDifference] = useState(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: yPos.value },
      { translateX: Math.sin(xPos.value * Math.PI * 2) * 5 }
    ],
    opacity: opacity.value,
  }));

  const coinsAnim = () => {
    opacity.value = 1;
    yPos.value = 0;
    xPos.value = 0;

    opacity.value = withTiming(0, { duration: 3000, easing: Easing.back() });
    yPos.value = withTiming(-250, { duration: 3000, easing: Easing.linear });
    xPos.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }), 10);
  };

  const updateUserData = async () => {
    try {
      await axios.put(`${DATABASE_SERVER_URI}/update-user-data/${userId}`, {
        coins,
        boost
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const difference = coins - lastCoinValue;
    if (boost < 0) {
      setBoost(0);
    }
    setLastCoinValue(coins);
    updateUserData();
    setCoinDifference(difference);
  }, [coins]);
  
  useEffect(() => {
    if (coinDifference !== 0) {
      playSound(sounds.coins);
      coinsAnim();
    }
  }, [lastCoinValue]);

  return (
    <View>
      <View style={styles.row}>
        <CVar name="" hp={boost} style={styles.var} color="#a085c4" bgColor="#663399" />
        <CText outlined size={25} style={styles.coins}>${coins}</CText>
        <Animated.View style={[styles.coins, animStyle]}>
          <CText outlined color={coinDifference > 0 ? "lightgreen" : "red"} size={25}>{`${coinDifference > 0 ? "+" : ""}${coinDifference}`}</CText>
        </Animated.View>
      </View>
      <View style={[styles.buttonContainer, style]} {...rest}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width:"100%",
    maxHeight: 110,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    backgroundColor: TransparentBlack,
  },
  row: {
    flexDirection: "row",
  },
  var: {
    width: "60%",
    height: 20,
    transform: [{translateY: -5}],
  },
  coins: {
    position: "absolute",
    transform: [{translateY: -7}],
    right: 0,
  }
});
