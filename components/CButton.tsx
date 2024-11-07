import { Pressable, StyleSheet, Vibration } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

type Props = {
  type: string,
  dest: string,
  image: React.ElementType,
  width?: number,
  height?: number
}

export default function CButton({type, dest, image, width, height}: Props) {
  const router = useRouter();
  const [buttonActive, setButtonActive] = useState(true);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    if (type == "link") {
      if (buttonActive) {
        router.push(dest);
      }
      setButtonActive(false);
      setTimeout(() => {
        setButtonActive(true);
      }, 500);
    }
  }

  const handlePressIn = () => {
    Vibration.vibrate(100);
    setScale(1.03);
  };

  const handlePressOut = () => {
    setScale(1);
  }

  const handleLongPress = () => {
  }

  const ButtonImage = image;
  // const ButtonImage = buttonMap[dest];

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      style={{ transform: [{scale}] }}
    >
      <ButtonImage width={width} height={90} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
  },
});
