import { Pressable, Vibration, Animated } from "react-native";
import { useRouter } from "expo-router";
import { type ComponentProps, useState, useRef } from "react";
import { useData } from "./CDataProvider";


type Props = Omit<ComponentProps<typeof Pressable>, 'onPressIn' | 'onPressOut'> & {href?: string};

export function CButton({ href, ...rest }: Props) {
  const router = useRouter();
  const {buttonActive, setButtonActive} = useData();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (href) {
      if (buttonActive) {
        router.push(href);
      }
      setButtonActive(false);
      setTimeout(() => {
        setButtonActive(true);
      }, 500);
    }
  }

  const scaleGrow = () => {
    Vibration.vibrate(100);
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const scaleShrink = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={scaleGrow}
        onPressOut={scaleShrink}
        {...rest}
      />
    </Animated.View>
  );
}
