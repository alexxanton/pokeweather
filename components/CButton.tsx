import { Pressable, StyleSheet, Vibration } from "react-native";
import { useRouter } from "expo-router";
import WheelButton from '@/assets/images/buttons/WheelButton';
import { useState } from "react";

type Props = {
  type: string,
  href?: string
}

export default function CButton({type, href}: Props) {
  const router = useRouter();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    if (!buttonPressed) {
      router.push(href);
    }
    
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
    }, 500);
  }

  const handlePressIn = () => {
    Vibration.vibrate(100);
    setScale(1.1);
  };

  const handlePressOut = () => {
    setScale(1);
  }

  const handleLongPress = () => {
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      style={{ transform: [{scale}] }}
    >
      <WheelButton width={90} height={90} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
  },
});
