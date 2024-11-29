import { StyleSheet } from 'react-native';
import { CText } from '@/components/text/CText';
import { View } from 'react-native';
import { CContainer } from '@/components/containers/CContainer';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import { useState } from 'react';
import { useData } from '@/components/CDataProvider';

import AdButton from '@/assets/images/buttons/AdButton';
import SpinButton from '@/assets/images/buttons/SpinButton';
import WheelSVG from '@/assets/images/misc/Wheel';


export default function Wheel() {
  const {wheelTries, setWheelTries} = useData();

  const spin = () => {
    setWheelTries(wheelTries - 1);
  };

  return (
    <>

      <CArrowButton />
      <View style={styles.container}>
        <CButton onPress={spin}>
          <WheelSVG width={300} height={300} />
        </CButton>
      </View>

      <View style={styles.tries}>
        <CText size={30}>x {wheelTries}</CText>
      </View>

      <CContainer>
        <CButton href="/ad">
          <AdButton width={90} height={90} />
        </CButton>
        <CButton onPress={spin}>
          <SpinButton width={180} height={90} />
        </CButton>
      </CContainer>
      
    </>
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
