import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";


const WheelButton = require('@/assets/images/buttons/wheel-btn.png');

export default function CButton(dest) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(dest)}>
      <Image source={WheelButton} style={styles.img} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  location: {
  },
  link: {
  },
  img: {
    aspectRatio: 1,
    width: 100
  }
});
