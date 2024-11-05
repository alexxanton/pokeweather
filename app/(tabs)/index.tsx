import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import CButton from "@/components/CButton";
import Pokeball from '@/assets/images/misc/Pokeball';


export default function Index() {
  return (
    <CBackground>
      <CText>Location</CText>
      <View style={styles.container}>
        <Pokeball width={200} height={200} />
        <View style={styles.buttonContainer}>
          <CButton dest={"/wheel"} />
          <CButton dest={"/wheel"} />
          <CButton dest={"/wheel"} />
        </View>
      </View>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonContainer: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    gap: 10,
    backgroundColor: "#ffffff33"
  }
});
