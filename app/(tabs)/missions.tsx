import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CContainer } from "@/components/CContainer";
import { CButton } from "@/components/CButton";

import TrophyButton from '@/assets/images/buttons/TrophyButton';
import { BackButton } from "@/components/navigation/BackButton";
import { CText } from "@/components/CText";

export default function Team() {
  return (
    <CBackground>
      <BackButton />
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
