import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { OutlinedText } from '@/components/OutlinedText';
import CButton from "@/components/CButton";
import Pokeball from '@/assets/images/misc/Pokeball';
import ButtonContainer from "@/components/ButtonContainer";


export default function Index() {
  return (
    <CBackground>
      <OutlinedText size={20}>Location</OutlinedText>
      <View style={styles.container}>
        <OutlinedText size={75}>23</OutlinedText>
        <Pokeball width={200} height={200} />
      </View>
      <ButtonContainer>
        <CButton type="link" href="/wheel" />
        <CButton type="link" href="/team" />
        <CButton type="link" href="/missions" />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
