import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { ButtonContainer } from "@/components/ButtonContainer";
import { CButton } from "@/components/CButton";
import { BackButton } from "@/components/BackButton";

import SignoutButton from '@/assets/images/buttons/SignoutButton';

export default function Team() {
  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>
      </View>
      <ButtonContainer>
        <CButton href="signout" image={SignoutButton} width={270} />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
