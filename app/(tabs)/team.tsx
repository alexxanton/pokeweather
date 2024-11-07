import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import ButtonContainer from "@/components/ButtonContainer";
import CButton from "@/components/CButton";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';

export default function Team() {
  return (
    <CBackground>
      <View style={styles.container}>
      </View>
      <ButtonContainer>
        <CButton type="link" dest="/boost" image={BoostButton} width={135} />
        <CButton type="link" dest="/battle" image={BattleButton} width={135} />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
