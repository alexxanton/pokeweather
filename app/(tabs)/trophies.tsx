import { StyleSheet, View } from "react-native";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";
import { useData } from "@/components/CDataProvider";
import { CPadding } from '@/components/containers/CPadding';

export default function Trophies() {
  const {temp, setTemp} = useData();
  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
      </View>
    </CPadding>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
