import { StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { CBackground } from '@/components/CBackground';
import { CText } from "@/components/CText";

export default function Index() {
  return (
    <CBackground>
      <CText>Edit app/index.tsx to edit this screen.</CText>
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
