import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CContainer } from "@/components/CContainer";
import { CButton } from "@/components/CButton";
import { BackButton } from "@/components/navigation/BackButton";
import { CText } from "@/components/CText";
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
