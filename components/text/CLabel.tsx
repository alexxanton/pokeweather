import { StyleSheet, View, type ViewProps } from "react-native";
import { CText } from "./CText";

type Props = ViewProps & {
  title: string
};

export function CLabel({children, title, style, ...rest}: Props) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
      <CText outlined size={25} style={styles.label}>{title}</CText>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: -15,
    right: 15
  },
  container: {
    // flex: 1,
    // flexDirection: "row-reverse"
  }
});