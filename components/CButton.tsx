import { Pressable, StyleSheet, Vibration } from "react-native";
import { useRouter } from "expo-router";
import { type ComponentProps, useState } from "react";

type ButtonProps = {
  href?: string,
}

type Props = Omit<ComponentProps<typeof Pressable>, 'onPressIn' | 'onPressOut'> & ButtonProps;

export function CButton({href, ...rest}: Props) {
  const router = useRouter();
  const [buttonActive, setButtonActive] = useState(true);
  const [scale, setScale] = useState(1);

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
    setScale(1.03);
  };

  const scaleShrink = () => {
    setScale(1);
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={scaleGrow}
      onPressOut={scaleShrink}
      style={{ transform: [{scale}] }}
      {...rest}
    />
  );
}
