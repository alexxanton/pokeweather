import { StyleSheet, View, FlatList, type FlatListProps } from "react-native";


export function CScrollPanel<T>({...rest}: FlatListProps<T>) {
  return (
    <View style={styles.container}>
      <FlatList
        {...rest}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 30,
          gap: 10
        }}
        columnWrapperStyle={{
          gap: 10
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: "#0C0C0D33",
  },
});
