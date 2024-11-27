import { StyleSheet, View } from "react-native";
import { type ViewProps } from "react-native";


export function CContainer({children, style, ...rest}: ViewProps) {
  return (
    <View style={[styles.buttonContainer, style]} {...rest}>
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
