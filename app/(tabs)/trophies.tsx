import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/containers/CBackground';
import { CContainer } from "@/components/containers/CContainer";
import { CButton } from "@/components/buttons/CButton";
import { BackButton } from "@/components/buttons/BackButton";
import { CText } from "@/components/text/CText";
import { useData } from "@/components/CDataProvider";

export default function Team() {
  const {temp, setTemp} = useData();
  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>
        <CText size={45}>{temp}</CText>
      </View>
    </CBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
