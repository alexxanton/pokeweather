import { StyleSheet, View, type ViewProps } from "react-native";
import { CText } from "./CText";

type CLabelProps = ViewProps & {
  title: string
};

export function CLabel({children, title, ...rest}: CLabelProps) {
  return (
    <View {...rest}>
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
