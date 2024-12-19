import { StyleSheet } from 'react-native';
import { CText } from '@/components/text/CText';
import { View } from 'react-native';
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import { useState } from 'react';
import { useData } from '@/components/CDataProvider';
import { CSwipeRightHandler } from '@/components/containers/CSwipeRightHandler';
import { TransparentBlack } from "@/constants/TransparentBlack";

import AdButton from '@/assets/images/buttons/AdButton';
import SpinButton from '@/assets/images/buttons/SpinButton';
import WheelSVG from '@/assets/images/misc/Wheel';


export default function Wheel() {
  const {wheelTries, setWheelTries} = useData();

  const spin = () => {
    setWheelTries(wheelTries - 1);
  };

  return (
    <CSwipeRightHandler>

      <CArrowButton />
      <View style={styles.container}>
        <CButton onPress={spin}>
          <WheelSVG width={300} height={300} />
        </CButton>
      </View>

      <View style={styles.tries}>
        <CText size={30}>x {wheelTries}</CText>
      </View>

      <CControlPanel>
        <CButton href="/ad">
          <AdButton width={90} height={90} />
        </CButton>
        <CButton onPress={spin}>
          <SpinButton width={180} height={90} />
        </CButton>
      </CControlPanel>
      
    </CSwipeRightHandler>
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
    backgroundColor: TransparentBlack
  }
});
