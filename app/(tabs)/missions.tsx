import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import ButtonContainer from "@/components/ButtonContainer";
import CButton from "@/components/CButton";

import TrophyButton from '@/assets/images/buttons/TrophyButton';
import BackButton from "@/components/BackButton";

export default function Team() {
  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>

      </View>
      <ButtonContainer>
        <CButton type="trophy" dest="/trophies" image={TrophyButton} width={270} />
      </ButtonContainer>
    </CBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
  },
});
