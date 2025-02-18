import { StyleSheet, View, FlatList, type FlatListProps } from "react-native";
import { TransparentBlack } from "@/constants/TransparentBlack";


export function CScrollPanel<T>({...rest}: FlatListProps<T>) {
  return (
    <View style={styles.container}>
      <FlatList
        {...rest}
        contentContainerStyle={{
          paddingVertical: 20,
          alignItems: "center",
          gap: 10,
        }}
        columnWrapperStyle={{
          gap: 5
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: TransparentBlack,
  },
});
