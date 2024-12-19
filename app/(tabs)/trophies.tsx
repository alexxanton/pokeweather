import { StyleSheet, View } from "react-native";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";
import { useData } from "@/components/CDataProvider";
import { CSwipeRightHandler } from '@/components/containers/CSwipeRightHandler';

export default function Trophies() {
  const {temp, setTemp} = useData();
  return (
    <CSwipeRightHandler>
      <CArrowButton />
      <View style={styles.container}>
      </View>
    </CSwipeRightHandler>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
