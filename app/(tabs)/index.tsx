import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { CButton } from "@/components/CButton";
import { ButtonContainer } from "@/components/ButtonContainer";

import Pokeball from '@/assets/images/misc/Pokeball';
import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';
import ProfileButton from '@/assets/images/buttons/ProfileButton';


export default function Index() {
  return (
    <CBackground>
      <View>
        <View style={styles.locationContainer}>
          <CText size={20} outline="yes">Location</CText>
        </View>
        <View style={styles.profileContainer}>
          <CButton href="/profile" image={ProfileButton} width={90}></CButton>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.degree}>
          <CText size={20} outline="yes">O</CText>
        </View>
        <CText size={75} outline="yes">23</CText>
        <CButton href="/battle" image={Pokeball} width={200} height={200} />
      </View>
      <ButtonContainer>
        <CButton href="/wheel" image={WheelButton} width={90} />
        <CButton href="/team" image={TeamButton} width={90} />
        <CButton href="/missions" image={MissionsButton} width={90} />
      </ButtonContainer>
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  locationContainer: {
    position: "absolute",
  },
  profileContainer: {
    alignSelf: "flex-end",
    position: "absolute"
  },
  degree: {
    right: -50,
    top: 15
  }
});
