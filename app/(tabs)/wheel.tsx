import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function Wheel() {
  return (
    <View style={styles.container}>
      <Image></Image>
      <Text style={styles.text}>Wheel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
