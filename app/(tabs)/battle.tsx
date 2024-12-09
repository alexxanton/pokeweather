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
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const {weatherCondition} = useData();
  const [pokemon, setPokemon] = useState(generateWildPokemon(weatherCondition));
  const [trigger, setTrigger] = useState(true);
  const [action, setAction] = useState("");
  const [oppTrigger, setOppTrigger] = useState(true);
  const [oppAction, setOppAction] = useState("");
  const hurtBuffer: (() => void)[] = [];
  let currentOpponent = 0;
  let currentMember = 0;

  const opponentName = pokedata[pokemon[currentOpponent].pkmn].name;
  const opponentHp = pokemon[currentOpponent].hp;
  const opponentLevel = pokemon[currentOpponent].level;
  const opponentSpecie = pokemon[currentOpponent].pkmn;
  

  // useEffect(() => {
  //   setTrigger(!trigger);
  // }, [trigger]);
  

  const sendSignal = (action:string) => {
    setTrigger(!trigger); // alternate between true and false so react detects a change and rerenders
    setAction(action);
  };

  const sendOppSignal = (action:string) => {
    setOppTrigger(!oppTrigger);
    setOppAction(action);
  };

  const sendAttack = () => {
    sendSignal("attack");
    updatePokemon(0, opponentHp - 1);
    setTimeout(() => {
      
      // sendOppSignal("attack");
    }, 300);
  };

  const updatePokemon = (id:number, newHp:number) => {
    setPokemon((prev) =>
      prev.map((pkmn, i) =>
        i === id ? {...pkmn, hp: newHp} : pkmn
      )
    );
  };
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar
        name={opponentName}
        hp={opponentHp}
      />
      <CText>{opponentHp}</CText>
      <View style={styles.container}>
        <CText outlined size={20}>LVL {opponentLevel}</CText>
        <CPokemon
          specie={opponentSpecie}
          style={styles.front}
          trigger={oppTrigger}
          action={oppAction}
          opponent
        />
        <CText>{}</CText>
        <CPokemon
          specie={25}
          style={styles.back}
          trigger={trigger}
          action={action}
        />
        <CText outlined size={20} style={styles.level}>LVL 40</CText>
      </View>
      <CVar name="urmom" hp={50}  style={styles.bottomVar} />
      <CControlPanel>
        <CButton>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton onPress={sendAttack}>
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
  bottomVar: {
    marginBottom: 20
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
