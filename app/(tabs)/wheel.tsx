import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { View } from 'react-native';
import { ButtonContainer } from '@/components/ButtonContainer';
import { CButton } from '@/components/CButton';
import { BackButton } from '@/components/BackButton';
import { useState } from 'react';

import AdButton from '@/assets/images/buttons/AdButton';
import SpinButton from '@/assets/images/buttons/SpinButton';


const WheelImage = require("@/assets/images/misc/wheel.png");


export default function Wheel() {
  const [tries, setTries] = useState(10);

  return (
    <CBackground>

      <BackButton />
      <View style={styles.container}>
        <Image source={WheelImage} style={styles.wheel} />
      </View>

      <View style={styles.tries}>
        <CText size={30}>x {tries}</CText>
      </View>

      <ButtonContainer>
        <CButton href="/ad">
          <AdButton width={90} height={90} />
        </CButton>
        <CButton>
          <SpinButton width={180} height={90} />
        </CButton>
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
    backgroundColor: "#0C0C0D33"
  }
});
