import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { ButtonContainer } from "@/components/ButtonContainer";
import { CButton } from "@/components/CButton";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';
import { BackButton } from "@/components/BackButton";

export default function Team() {
  return (
    <CBackground>

      <BackButton />
      <View style={styles.container}>
        
      </View>

      <ButtonContainer>
        <CButton href="/boost">
          <BoostButton width={135} height={90} />
        </CButton>
        <CButton href="/battle">
          <BattleButton width={135} height={90} />
        </CButton>
      </ButtonContainer>

    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
