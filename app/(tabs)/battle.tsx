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

import Pokeball from '@/assets/images/misc/Pokeball'


export default function Battle() {
  const [pokemon, setPokemon] = useState<number[]>();
  const {condition} = useData();
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");

  const map = {
    "thunder": ["electric", "steel", "dragon"],
    "rain": ["water", "grass", "electric", "psychic"],
    "night": ["dark", "fairy", "ghost", "psychic"],
    "snow": ["ice", "steel", "water", "fairy"],
    "cold": ["ice", "ground", "ghost", "rock"],
    "hot": ["fire", "dragon", "fighting", "rock"],
    "clear": ["normal", "grass", "fire", "flying"],
    "partly": ["bug", "normal", "grass", "rock"],
    "cloudy": ["poison", "dark", "fighting"],
    "windy": ["flying", "dragon", "bug", "fairy"]
  };

  const index = condition;
  const states = map[index];
  const candidates = states.flatMap((state: number) => typesdata[state].pokemon)

  const arr = [1, 2, 3, 4, 5];
  let stats = [];

  const getLevelAvg = () => {};


  arr.forEach(pkmn => {
    stats.push({});
  });

  useEffect(() => {
    setPokemon(arr);
  }, []);
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar name="ho-oh" hp={10} />
      <View style={styles.container}>
        <CText outlined size={20}>LVL 42</CText>
        <CPokemon specie={25} front style={styles.front} />
        <CPokemon specie={25} style={styles.back} />
        <CText outlined size={20} style={styles.level}>LVL 40</CText>
        <CText>{candidates}</CText>
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
