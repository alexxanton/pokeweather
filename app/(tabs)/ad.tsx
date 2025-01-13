import { useData } from "@/components/CDataProvider";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Ad() {
  const {wheelTries, setWheelTries, setSong} = useData();

  useEffect(() => {
    setSong("ad");
    setWheelTries(wheelTries + 10);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/misc/ad.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%"
  }
});
