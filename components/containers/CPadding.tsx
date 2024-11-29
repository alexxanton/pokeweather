import { StyleSheet, View, type ViewProps } from "react-native";

export function CPadding({children}: ViewProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  }
});
