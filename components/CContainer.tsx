import { StyleSheet, View } from "react-native";
import { type PropsWithChildren } from "react";


export function CContainer({children}: PropsWithChildren) {
  return (
    <View style={styles.buttonContainer}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    gap: 10,
    // backgroundColor: "#ffffff33",
    backgroundColor: "#0C0C0D33"
  }
});
