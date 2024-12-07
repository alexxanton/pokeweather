import { StyleSheet, View, type ViewProps } from "react-native";
import { CText } from "./CText";

type CLabelProps = ViewProps & {
  title: string
};

export function CLabel({children, title, style}: CLabelProps) {
  return (
    <View style={style}>
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
});
