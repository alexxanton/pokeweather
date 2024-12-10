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
import axios from "axios";

import Pokeball from '@/assets/images/misc/Pokeball'
import { generateWildPokemon } from "@/utils/generateWildPokemon";
import { CAttackEffect } from "@/components/battle/CAttackEffect";


export default function Battle() {
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const {weatherCondition} = useData();
  const [control, setControl] = useState(true);

  const [pokemon, setPokemon] = useState(generateWildPokemon(weatherCondition));
  const [trigger, setTrigger] = useState(true);
  const [action, setAction] = useState("");
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(generateWildPokemon(weatherCondition));
  const [wpTrigger, setWpTrigger] = useState(true);
  const [wpAction, setWpAction] = useState("");
  const [wpIndex, setWpIndex] = useState(0);

  const wpSpecie = wildPokemon[wpIndex].specie;
  const wpName = pokedata[wpSpecie].name;
  const wpHp = wildPokemon[wpIndex].hp;
  const wpBaseHp = wildPokemon[wpIndex].baseHp;
  const wpLevel = wildPokemon[wpIndex].level;

  const pkmnSpecie = pokemon[pkmnIndex].specie;
  const pkmnName = pokedata[pkmnSpecie].name;
  const pkmnHp = pokemon[pkmnIndex].hp;
  const pkmnBaseHp = pokemon[pkmnIndex].baseHp;
  const pkmnLevel = pokemon[pkmnIndex].level;
  

  // useEffect(() => {
  //   sendSignal("attack");
  // }, [trigger]);
  
  useEffect(() => {
    if (wpHp <= 0) {
      setControl(false);
      setWpAction("defeat");
      setTimeout(() => {
        if (wpIndex < wildPokemon.length - 1) {
          setWpIndex(wpIndex + 1);
          setWpAction("next");
          setTimeout(() => {
            setWpTrigger(!wpTrigger);
            setControl(true);
          }, 1000);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        if (wpHp > 0) {
          sendWpSignal("attack");
          takeDamage(setPokemon, pkmnIndex, pkmnHp - 7);
        }
      }, randint(100, 1000));
    }
  }, [wpTrigger]);

  const sendSignal = (action:string) => {
    setTrigger(!trigger); // alternate between true and false so react detects a change and rerenders
    setAction(action);
  };

  const sendWpSignal = (action:string) => {
    setWpTrigger(!wpTrigger);
    setWpAction(action);
  };

  const sendAttack = () => {
    if (control) {
      sendSignal("attack");
      takeDamage(setWildPokemon, wpIndex, wpHp - 7);
    }
  };

  const takeDamage = (setter: React.Dispatch<React.SetStateAction<any>>, id:number, newHp:number) => {
    setter((prev: any) =>
      prev.map((pkmn: any, i: number) =>
        i === id ? {...pkmn, hp: newHp} : pkmn
      )
    );
  };

  const nextPokemon = () => {
    setPkmnIndex(pkmnIndex < pokemon.length - 1 ? pkmnIndex + 1 : 0);
  };

  const prevPokemon = () => {
    setPkmnIndex(pkmnIndex > 0 ? pkmnIndex - 1 : pokemon.length - 1);
  };
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CVar name={wpName} hp={wpHp / wpBaseHp * 100} />
      <CText>{wpHp}</CText>
      <View style={styles.container}>
        <CText outlined size={20}>LVL {wpLevel}</CText>

        <CPokemon
          specie={wpSpecie}
          style={styles.front}
          trigger={wpTrigger}
          action={wpAction}
          opponent
        >
          <CAttackEffect trigger={trigger} action={action} />
        </CPokemon>

        <CPokemon
          specie={pkmnSpecie}
          style={styles.back}
          trigger={trigger}
          action={action}
        >
          <CAttackEffect trigger={wpTrigger} action={wpAction} />
        </CPokemon>

        <CText outlined size={20} style={styles.level}>{`LVL ${pkmnLevel}`}</CText>
      </View>
      <CVar name={pkmnName} hp={pkmnHp / pkmnBaseHp * 100} style={styles.bottomVar} />
      <CControlPanel>
        <CButton onPress={prevPokemon}>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton onPress={sendAttack}>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton onPress={nextPokemon}>
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
