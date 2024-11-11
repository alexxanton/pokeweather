import { View } from "react-native";
import { Text, StyleSheet, type TextProps } from "react-native";


type CTextProps = TextProps & {
  size: number,
  outlined?: boolean
};

export function CText({ children, size, outlined, style, ...rest }: CTextProps) {
  if (outlined) {
    return (
      <View style={styles.container} {...rest}>
        {/* Outline layers */}
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTopLeft, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTopRight, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottomLeft, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottomRight, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineTop, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineBottom, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineLeft, style]}>{children}</Text>
        <Text style={[{fontSize:size}, styles.text, styles.outline, styles.outlineRight, style]}>{children}</Text>
        {/* Main text */}
        <Text style={[{fontSize:size}, styles.text, style]}>{children}</Text>
      </View>
    );
  }

  return (
    <Text style={[styles.text, {fontSize:size}, style]} {...rest}>
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
