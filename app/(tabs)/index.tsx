import { Text, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { CBackground } from '@/components/CBackground';

export default function Index() {
  return (
    <CBackground>
      <Text style={{ fontFamily: 'BlackHanSans' }}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/wheel"}>
        Wheel
      </Link>
      <Link href={"/missions"}>
        Missions
      </Link>
      <Link href={"/profile"}>
        Profile
      </Link>
    </CBackground>
  );
}

const styles = StyleSheet.create({
});
