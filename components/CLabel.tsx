import { StyleSheet, View } from "react-native";
import { type ViewProps } from "react-native";
import { CText } from "./CText";

type Props = ViewProps & {
  title: string
};

export default function CLabel({children, title, style, ...rest}: Props) {
  return (
    <View style={styles.container} {...rest}>
      {children}
      <CText outlined size={25} style={styles.label}>{title}</CText>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    alignSelf: "flex-end",
    top: -15,
    right: 15
  },
  container: {
    flexDirection: "row-reverse"
  }
});
