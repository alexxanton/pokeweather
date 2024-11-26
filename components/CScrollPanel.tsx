import { ScrollView, StyleSheet, View } from "react-native";
import { type ViewProps } from "react-native";


export function CScrollPanel({children, style, ...rest}: ViewProps) {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        style={styles.scroll}
        overScrollMode="always"
        nestedScrollEnabled
        {...rest}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width:"100%",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "#0C0C0D33",
  }
});
