import { PropsWithChildren } from "react";
import { Text, StyleSheet, View } from "react-native";

export function OutlinedText({ children, size }: PropsWithChildren & {size:number}) {
  return (
    <View style={styles.container}>
      {/* Outline layers */}
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTopLeft]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTopRight]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottomLeft]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottomRight]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTop]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottom]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineLeft]}>{children}</Text>
      <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineRight]}>{children}</Text>
      {/* Main text */}
      <Text style={[{fontSize:size}, styles.text]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  text: {
    fontFamily: 'BlackHanSans',
    color: "white"
  },
  outline: {
    color: 'black', // Outline color
    position: 'absolute'
  },
  outlineTopLeft: {
    top: -2,
    left: -2
  },
  outlineTopRight: {
    top: -2,
    left: 2
  },
  outlineBottomLeft: {
    top: 2,
    left: -2
  },
  outlineBottomRight: {
    top: 2,
    left: 2
  },
  outlineTop: {
    top: -2,
    left: 0
  },
  outlineBottom: {
    top: 2,
    left: 0
  },
  outlineLeft: {
    top: 0,
    left: -2
  },
  outlineRight: {
    top: 0,
    left: 2
  }
});
