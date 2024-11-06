import { Button, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { View } from 'react-native';
import ButtonContainer from '@/components/ButtonContainer';
import CButton from '@/components/CButton';


const WheelImage = require("@/assets/images/misc/wheel.png");


export default function Wheel() {
  return (
    <CBackground>
      <View style={styles.container}>
        <Image source={WheelImage} style={styles.wheel} />
      </View>
      <View style={styles.tries}>
        <CText size={30}>x 10</CText>
      </View>
      <ButtonContainer>
        <CButton type="ad" />
        <CButton type="spin" />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wheel: {
    width: "85%",
    aspectRatio: 1
  },
  tries: {
    marginBottom: 20,
    width: "35%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    gap: 10,
    // backgroundColor: "#ffffff33",
    backgroundColor: "#0C0C0D33"
  }
});
