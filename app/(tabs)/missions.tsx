import { StyleSheet, View } from "react-native";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CSwipeRightHandler } from '@/components/containers/CSwipeRightHandler';

import TrophyButton from '@/assets/images/buttons/TrophyButton';
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";

export default function Missions() {
  return (
    <CSwipeRightHandler>
      <CArrowButton />
      <View style={styles.container}>
      </View>
      <CControlPanel>
        <CButton href="/trophies">
          <TrophyButton width={270} height={90} />
        </CButton>
      </CControlPanel>
    </CSwipeRightHandler>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
