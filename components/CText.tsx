import { PropsWithChildren } from "react";
import { Text, StyleSheet } from "react-native";

export function CText({ children, size }: PropsWithChildren & {size:number}) {
  return (
    <Text style={[styles.text, {fontSize:size}]}>
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
