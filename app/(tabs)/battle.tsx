import { StyleSheet, View } from "react-native";
import { CPadding } from '@/components/containers/CPadding';
import { CVar } from "@/components/battle/CVar";
import { CPokemon } from "@/components/battle/CPokemon";
import { CText } from "@/components/text/CText";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CPreventBackButton } from "@/components/battle/CPreventBackButton";
import { useData } from "@/components/CDataProvider";
import { useEffect, useState } from "react";
import { randint } from "@/utils/randint";

import Pokeball from '@/assets/images/misc/Pokeball'
import { generateWildPokemon } from "@/utils/generateWildPokemon";


export default function Battle() {
  const [pokemon, setPokemon] = useState<number[]>();
  const [trigger, setTrigger] = useState(true);
  const [action, setAction] = useState("");
  
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const typeMap = require("@/assets/data/typemap.json")

  // const randomPokemon = generateWildPokemon();
  

  // useEffect(() => {
  //   setPokemon(randomPokemon);
  // }, []);

  const attack = () => {
    setTrigger(!trigger);
    // setAction("attack");
  };
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar name="ho-oh" hp={10} />
      <View style={styles.container}>
        <CText outlined size={20}>LVL 42</CText>
        <CPokemon
          specie={25}
          front
          style={styles.front}
        />
        {/* <CText>{randomPokemon.join(",")}</CText> */}
        <CPokemon
          specie={25}
          style={styles.back}
          trigger={trigger}
          action={action}
        />
        <CText outlined size={20} style={styles.level}>LVL 40</CText>
      </View>
      <CVar name="urmom" hp={50} />
      <CControlPanel style={styles.buttons}>
        <CButton>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton onPress={() => setTrigger(!trigger)}>
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
