import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Link } from 'expo-router';

const Background = require("@/assets/images/bg.png")

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.bg}>
        <Text style={{ fontFamily: 'BlackHanSans' }}>Edit app/index.tsx to edit this screen.</Text>
        <Link href={"/wheel"}>
          Wheel
        </Link>
        <Link href={"/missions"}>
          Missions
        </Link>
        <Link href={"/profile"}>
          Profile
        </Link>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1
  },
  container: {
    flex: 1,
  }
});
