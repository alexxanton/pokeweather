import { type ComponentProps, PropsWithChildren } from "react";
import { View } from "react-native";
import { Text, StyleSheet } from "react-native";


type CustomProps = PropsWithChildren<{
  size: number,
  outline?: string
}>;

type Props = ComponentProps<typeof Text> & CustomProps;

export function CText({ children, size, outline, ...rest }: Props) {
  if (outline == "yes") {
    return (
      <View style={styles.container} {...rest}>
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

  return (
    <Text style={[styles.text, {fontSize:size}]} {...rest}>
      {children}
    </Text>
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
    color: 'black',
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
