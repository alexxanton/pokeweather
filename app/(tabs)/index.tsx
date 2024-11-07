import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { OutlinedText } from '@/components/OutlinedText';
import CButton from "@/components/CButton";
import Pokeball from '@/assets/images/misc/Pokeball';
import ButtonContainer from "@/components/ButtonContainer";

import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';
import ProfileButton from '@/assets/images/buttons/ProfileButton';


export default function Index() {
  return (
    <CBackground>
      <View>
        <View style={styles.locationContainer}>
          <OutlinedText size={20}>Location</OutlinedText>
        </View>
        <View style={styles.profileContainer}>
          <CButton type="link" dest="/profile" image={ProfileButton} width={90} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.degree}>
          <OutlinedText size={20}>O</OutlinedText>
        </View>
        <OutlinedText size={75}>23</OutlinedText>
        <CButton type="link" dest="/battle" image={Pokeball} width={200} height={200} />
      </View>
      <ButtonContainer>
        <CButton type="link" dest="/wheel" image={WheelButton} width={90} />
        <CButton type="link" dest="/team" image={TeamButton} width={90} />
        <CButton type="link" dest="/missions" image={MissionsButton} width={90} />
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
