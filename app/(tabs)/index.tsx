import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { OutlinedText } from '@/components/OutlinedText';
import CButton from "@/components/CButton";
import Pokeball from '@/assets/images/misc/Pokeball';


export default function Index() {
  return (
    <CBackground>
      <OutlinedText size={20}>Location</OutlinedText>
      <View style={styles.container}>
        <OutlinedText size={75}>23</OutlinedText>
        <Pokeball width={200} height={200} />
      </View>
      <View style={styles.buttonContainer}>
        <CButton href={"/wheel"} />
        <CButton href={"/team"} />
        <CButton href={"/missions"} />
      </View>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    gap: 10,
    // backgroundColor: "#ffffff33",
    backgroundColor: "#0C0C0D33"
  }
});
