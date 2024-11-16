import { type PropsWithChildren } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useData } from "./CProvider";

const BackgroundImage = require("@/assets/images/backgrounds/partly.png")


export function CBackground({ children }: PropsWithChildren) {
  const {temp} = useData();
  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.bg}>
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    paddingTop: 50,
    padding: 20
  }
});
