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
        <CText size={20} outlined style={styles.location}>Location</CText>
        <View style={styles.profile}>
          <CButton href="/profile">
            <ProfileButton />
          </CButton>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.temperature}>
          <CText size={75} outlined>23</CText>
          <CText size={20} outlined style={styles.degree}>O</CText>
        </View>
        <CButton href="/battle">
          <Pokeball width={200} height={200} />
        </CButton>
      </View>

      <ButtonContainer>
        <CButton href="/wheel">
          <WheelButton width={90} height={90} />
        </CButton>
        <CButton href="/team">
          <TeamButton width={90} height={90} />
        </CButton>
        <CButton href="/missions">
          <MissionsButton width={90} height={90} />
        </CButton>
      </ButtonContainer>
      
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    flexDirection: "row",
  },
  degree: {
    position: 'absolute',
    transform: [{ translateY: -10 }],
  },
  location: {
    position: "absolute",
  },
  profile: {
    alignSelf: "flex-end",
    position: "absolute",
  },
});
