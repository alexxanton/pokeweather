import { ScrollView, StyleSheet, View, type ViewProps } from "react-native";


export function CScrollPanel({children, style, ...rest}: ViewProps) {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      overScrollMode="always"
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    // flex: 1,
    paddingTop: 30,
    borderRadius: 15,
    backgroundColor: "#0C0C0D33",
  }
});
