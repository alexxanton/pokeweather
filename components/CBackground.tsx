import { PropsWithChildren } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const BackgroundImage = require("@/assets/images/backgrounds/partly.png")


export function CBackground({ children }: PropsWithChildren) {
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
    paddingTop: 100,
    padding: 20
  }
});
