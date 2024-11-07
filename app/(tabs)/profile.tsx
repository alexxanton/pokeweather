import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import ButtonContainer from "@/components/ButtonContainer";
import CButton from "@/components/CButton";
import SignoutButton from '@/assets/images/buttons/SignoutButton';
import BackButton from "@/components/BackButton";

export default function Team() {
  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>
      </View>
      <ButtonContainer>
        <CButton type="profile" dest="signout" image={SignoutButton} width={270} />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
