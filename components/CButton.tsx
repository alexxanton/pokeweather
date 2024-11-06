import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import WheelButton from '@/assets/images/buttons/WheelButton';

type Props = {
  href: string
}

export default function CButton({href}: Props) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(href)} style={styles.btn}>
      <WheelButton width={90} height={90} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
  }
});
