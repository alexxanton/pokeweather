import { Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CBackground } from '@/components/CBackground';

const WheelImage = require("@/assets/images/misc/wheel.png");


export default function Wheel() {
  return (
    <CBackground>
      <Image source={WheelImage} style={styles.image} />
      <Text style={styles.text}>Wheel</Text>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  image: {
    width: "85%",
    aspectRatio: 1
  }
});
