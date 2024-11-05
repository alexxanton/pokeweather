import { PropsWithChildren } from "react";
import { Text, StyleSheet } from "react-native";

export function CText({ children }: PropsWithChildren) {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BlackHanSans',
    color: "white"
  }
});