import { StyleSheet } from 'react-native';
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { View } from 'react-native';
import { CContainer } from '@/components/CContainer';
import { CButton } from '@/components/CButton';
import { BackButton } from '@/components/navigation/BackButton';
import { useState } from 'react';

import AdButton from '@/assets/images/buttons/AdButton';
import SpinButton from '@/assets/images/buttons/SpinButton';
import WheelSVG from '@/assets/images/misc/Wheel';


export default function Wheel() {
  const [tries, setTries] = useState(10);

  const spin = () => {
    setTries(tries - 1);
  };

  return (
    <CBackground>

      <BackButton />
      <View style={styles.container}>
        <CButton onPress={spin}>
          <WheelSVG width={300} height={300} />
        </CButton>
      </View>

      <View style={styles.tries}>
        <CText size={30}>x {tries}</CText>
      </View>

      <CContainer>
        <CButton href="/ad">
          <AdButton width={90} height={90} />
        </CButton>
        <CButton onPress={spin}>
          <SpinButton width={180} height={90} />
        </CButton>
      </CContainer>
      
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
