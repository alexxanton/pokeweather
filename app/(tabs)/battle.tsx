import { StyleSheet, View } from "react-native";
import { CPadding } from '@/components/containers/CPadding';
import { CVar } from "@/components/battle/CVar";
import { CPokemon } from "@/components/battle/CPokemon";
import { CText } from "@/components/text/CText";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";


import Pokeball from '@/assets/images/misc/Pokeball'
import { CPreventBackButton } from "@/components/battle/CPreventBackButton";

export default function Team() {
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar name="ho-oh" hp={10} />
      <View style={styles.container}>
        <CText outlined size={20}>LVL 42</CText>
        <CPokemon specie={6} front style={styles.front} />
        <CPokemon specie={6} style={styles.back} />
        <CText outlined size={20} style={styles.level}>LVL 40</CText>
      </View>
      <CVar name="urmom" hp={50} />
      <CControlPanel style={styles.buttons}>
        <CButton>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton>
          <Pokeball width={100} height={100} />
        </CButton>
      </CControlPanel>
    </CPadding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  level: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  buttons: {
    marginTop: 10
  },
  front: {
    position: "absolute",
    top: 0,
    right: -25,
  },
  back: {
    position: "absolute",
    bottom: 0,
    left: -25
  }
});
