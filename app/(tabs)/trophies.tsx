import { StyleSheet, View } from "react-native";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";
import { useData } from "@/components/CDataProvider";
import { CGestureHandler } from '@/components/containers/CGestureHandler';

export default function Trophies() {
  const {temp, setTemp} = useData();
  return (
    <CGestureHandler>
      <CArrowButton />
      <View style={styles.container}>
      </View>
    </CGestureHandler>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
