import { StyleSheet, View } from "react-native";
import { CPadding } from '@/components/containers/CPadding';
import { CVar } from "@/components/battle/CVar";
import { CPokemon } from "@/components/battle/CPokemon";
import { CText } from "@/components/text/CText";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CPreventBackButton } from "@/components/battle/CPreventBackButton";
import { CAttack } from "@/components/battle/CAttack";
import { CEffect } from "@/components/battle/CEffect";
import { useData } from "@/components/CDataProvider";
import { useEffect, useState } from "react";
import { randint } from "@/utils/randint";

import Pokeball from '@/assets/images/misc/Pokeball'


export default function Battle() {
  const [pokemon, setPokemon] = useState<number[]>();
  const [trigger, setAction] = useState(true);
  const {condition} = useData();
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const typeMap = require("@/assets/data/typemap.json")

  const states = typeMap[condition];
  const candidates = states.flatMap((state: number) => typesdata[state].pokemon);
  let randomPokemon: number[] = [];

  const pickRandomPokemon = () => {
    const randomPick = randint(0, candidates.length - 1);
    const candidate = candidates[randomPick];
    let accepted = true;
    console.log(candidate)
    if (pokedata[candidate].is_legendary) {
      if (randint(0, 100) != 1) {
        accepted = false;
      }
    }
    
    if (accepted) {
      randomPokemon.push(candidate);
    } else {
      pickRandomPokemon();
    }
  };
  
  for (let i = 0; i < 6; i++) {
    pickRandomPokemon();
  }
  
  const getLevelAvg = () => {
    const avg = 10;
    const max = 15;
    return {avg, max};
  };

  const avg = getLevelAvg().avg;
  const max = getLevelAvg().max;
  
  const generateStats = (arr: number[]) => {
    let stats: object[] = [];
    arr.forEach(pkmn => {
      const level = randint(avg, max);
      const hp = level * 10;
      const attack = level * 2;
      stats.push({pkmn, hp, attack});
    });
    return stats;
  };

  generateStats(randomPokemon);

  useEffect(() => {
    setPokemon(randomPokemon);
  }, []);
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar name="ho-oh" hp={10} />
      <View style={styles.container}>
        <CText outlined size={20}>LVL 42</CText>
        <CPokemon specie={25} front style={styles.front} />
        <CText>{randomPokemon.join(",")}</CText>
        <CPokemon specie={25} style={styles.back} trigger={trigger} />
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
        <CButton onPress={() => setAction(!trigger)}>
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
