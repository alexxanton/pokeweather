import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/containers/CBackground';
import { CContainer } from "@/components/containers/CContainer";
import { CButton } from "@/components/buttons/CButton";

import TrophyButton from '@/assets/images/buttons/TrophyButton';
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";

export default function Team() {
  return (
    <CBackground>
      <CArrowButton />
      <View style={styles.container}>
      </View>
      <CContainer>
        <CButton href="/trophies">
          <TrophyButton width={270} height={90} />
        </CButton>
      </CContainer>
    </CBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
