import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';

const WheelImage = require("@/assets/images/misc/wheel.png");


export default function Wheel() {
  return (
    <CBackground>
      <Image source={WheelImage} style={styles.image} />
      <CText>Wheel</CText>
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
