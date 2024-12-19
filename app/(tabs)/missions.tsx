import { StyleSheet, View } from "react-native";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CGestureHandler } from '@/components/containers/CGestureHandler';

import TrophyButton from '@/assets/images/buttons/TrophyButton';
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";

export default function Missions() {
  return (
    <CGestureHandler>
      <CArrowButton />
      <View style={styles.container}>
      </View>
      <CControlPanel>
        <CButton href="/trophies">
          <TrophyButton width={270} height={90} />
        </CButton>
      </CControlPanel>
    </CGestureHandler>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
