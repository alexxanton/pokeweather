import { StyleSheet, View } from "react-native";
import { CPadding } from '@/components/containers/CPadding';
import { CVar } from "@/components/battle/CVar";
import { CPokemon } from "@/components/battle/CPokemon";
import { CText } from "@/components/text/CText";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CPreventBackButton } from "@/components/battle/CPreventBackButton";
import { CAttackEffect } from "@/components/battle/CAttackEffect";
import { useData } from "@/components/CDataProvider";
import { useEffect, useState } from "react";
import { randint } from "@/utils/randint";
import { generateWildPokemon } from "@/utils/generateWildPokemon";
import axios from "axios";

import Pokeball from '@/assets/images/misc/Pokeball';
import SwitchButton from '@/assets/images/buttons/SwitchButton';


export default function Battle() {
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const effectLimit = 5;

  const {weatherCondition} = useData();
  const [control, setControl] = useState(true);
  const [animIndex, setAnimIndex] = useState(0);

  const [pokemon, setPokemon] = useState(generateWildPokemon(weatherCondition));
  const [trigger, setTrigger] = useState(true);
  const [action, setAction] = useState("");
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(generateWildPokemon(weatherCondition));
  const [wildTrigger, setWildTrigger] = useState(true);
  const [wildAction, setWildAction] = useState("");
  const [wildIndex, setWildIndex] = useState(0);

  const wildSpecie = wildPokemon[wildIndex].specie;
  const wildName = pokedata[wildSpecie].name;
  const wildHp = wildPokemon[wildIndex].hp;
  const wildBaseHp = wildPokemon[wildIndex].baseHp;
  const wildLevel = wildPokemon[wildIndex].level;

  const pkmnSpecie = pokemon[pkmnIndex].specie;
  const pkmnName = pokedata[pkmnSpecie].name;
  const pkmnHp = pokemon[pkmnIndex].hp;
  const pkmnBaseHp = pokemon[pkmnIndex].baseHp;
  const pkmnLevel = pokemon[pkmnIndex].level;

  async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  useEffect(() => {
    const wildPokemonLoop = async () => {
      if (wildHp <= 0) {
        setControl(false);
        await delay(1000);
        setWildAction("defeat");
        await delay(1000);
        if (wildIndex < wildPokemon.length - 1) {
          setWildIndex(wildIndex + 1);
          setWildAction("next");
          await delay(1500);
          setWildTrigger(!wildTrigger);
          setControl(true);
        }
      } else {
        await delay(randint(100, 1000));
        if (wildPokemon[wildIndex].hp > 0) {
          setWildAction("attack");
          setWildTrigger(!wildTrigger);
          setAction("hurt");
          setTimeout(() => {
            setAction("");
          }, 100);
          takeDamage(setPokemon, pkmnIndex, pkmnHp - 7);
        }
      }
    };

    wildPokemonLoop();
  }, [wildTrigger]);

  const sendSignal = (
    triggerSetter: React.Dispatch<React.SetStateAction<boolean>>,
    actionSetter: React.Dispatch<React.SetStateAction<string>>,
    trigger: boolean,
    action:string
  ) => {
    triggerSetter(!trigger);
    actionSetter(action);
  };

  

  const sendAttack = () => {
    setAction("attack");
    setTrigger(!trigger); // alternate between true and false so react detects a change and rerenders

    if (wildHp > 0) setWildAction("hurt");
    setTimeout(() => {
      setWildAction("");
    }, 100);

    setAnimIndex(animIndex < effectLimit - 1 ? animIndex + 1 : 0);
    takeDamage(setWildPokemon, wildIndex, wildHp - 50);
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
      <CVar name={wildName} hp={wildHp / wildBaseHp * 100} />
      <CText>{wildHp}</CText>
      <View style={styles.container}>
        <CText outlined size={20}>LVL {wildLevel}</CText>

        <CPokemon
          specie={wildSpecie}
          style={styles.front}
          trigger={wildTrigger}
          action={wildAction}
          wild
        >
          {[...Array(effectLimit)].map((_, i) => {
            return <CAttackEffect trigger={trigger} animIndex={animIndex} num={i} key={i} />
          })}
        </CPokemon>

        <CPokemon
          specie={pkmnSpecie}
          style={styles.back}
          trigger={trigger}
          action={action}
        >
          <CAttackEffect trigger={wildTrigger} />
        </CPokemon>

        <CText outlined size={20} style={styles.level}>{`LVL ${pkmnLevel}`}</CText>
      </View>
      <CVar name={pkmnName} hp={pkmnHp / pkmnBaseHp * 100} style={styles.bottomVar} />
      <CControlPanel style={styles.buttons}>
        <CButton onPress={prevPokemon}>
          <SwitchButton width={100} height={100} style={{transform: [{scaleX: -1}]}} />
        </CButton>
        <CButton onPress={sendAttack}>
          <Pokeball width={100} height={100} />
        </CButton>
        <CButton onPress={nextPokemon}>
          <SwitchButton width={100} height={100} />
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
  },
  buttons: {
    justifyContent: "center",
    gap: 10,
  }
});
