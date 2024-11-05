import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import WheelButton from '@/assets/images/buttons/WheelButton';



export default function CButton(dest:any) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(dest)} style={styles.btn}>
      <WheelButton width={90} height={90} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
  }
});
