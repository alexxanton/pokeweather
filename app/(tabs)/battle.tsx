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
import { useEffect, useMemo, useState } from "react";
import { randint } from "@/utils/randint";
import { generateWildPokemon } from "@/utils/generateWildPokemon";
import axios from "axios";

import Pokeball from '@/assets/images/misc/Pokeball';
import SwitchButton from '@/assets/images/buttons/SwitchButton';


export default function Battle() {
  const effectLimit = 5;

  const {weatherCondition, boost, setBoost} = useData();
  const [control, setControl] = useState(true);
  const [animIndex, setAnimIndex] = useState(0);

  const [pokemon, setPokemon] = useState(() => generateWildPokemon(weatherCondition));
  const [trigger, setTrigger] = useState(true);
  const [action, setAction] = useState("");
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(() => generateWildPokemon(weatherCondition));
  const [wildTrigger, setWildTrigger] = useState(true);
  const [wildAction, setWildAction] = useState("");
  const [wildIndex, setWildIndex] = useState(0);

  const wildSpecie = useMemo(() => wildPokemon[wildIndex].specie, [wildIndex]);
  const wildName = useMemo(() => wildPokemon[wildIndex].name, [wildSpecie]);
  const wildHp = useMemo(() => wildPokemon[wildIndex].hp, [wildPokemon, wildIndex]);
  const wildBaseHp = useMemo(() => wildPokemon[wildIndex].baseHp, [wildIndex]);
  const wildLevel = useMemo(() => wildPokemon[wildIndex].level, [wildIndex]);
  const wildDamage = useMemo(() => wildPokemon[wildIndex].attack, [wildIndex]);
  const wildDefense = useMemo(() => wildPokemon[wildIndex].defense, [wildIndex]);

  const pkmnSpecie = useMemo(() => pokemon[pkmnIndex].specie, [pkmnIndex]);
  const pkmnName = useMemo(() => pokemon[pkmnIndex].name, [pkmnSpecie]);
  const pkmnHp = useMemo(() => pokemon[pkmnIndex].hp, [pokemon, pkmnIndex]);
  const pkmnBaseHp = useMemo(() => pokemon[pkmnIndex].baseHp, [pkmnIndex]);
  const pkmnLevel = useMemo(() => pokemon[pkmnIndex].level, [pkmnIndex]);
  const pkmnDamage = useMemo(() => pokemon[pkmnIndex].attack, [pkmnIndex]);
  const pkmnDefense = useMemo(() => pokemon[pkmnIndex].defense, [pkmnIndex]);

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
          inflictDamage(setPokemon, pkmnIndex, pkmnHp, wildDamage, pkmnDefense);
        }
      }
    };

    wildPokemonLoop();
  }, [wildTrigger]);

  const sendAttack = () => {
    setAction("attack");
    setTrigger(!trigger); // alternate between true and false so react detects a change and rerenders
    setAnimIndex(animIndex < effectLimit - 1 ? animIndex + 1 : 0);
    const boostModifier = boost > 0 ? 3 : 1;
    setBoost(boost - 1);
    inflictDamage(setWildPokemon, wildIndex, wildHp, pkmnDamage * boostModifier, wildDefense);
  };

  const inflictDamage = (
    pokemon: React.Dispatch<React.SetStateAction<any>>,
    id: number,
    hp: number,
    damage: number,
    defense: number
  ) => {
    const newHp = hp - Math.round(damage / defense);
    if (hp > 0) {
      pokemon((prev: any) =>
        prev.map((pkmn: any, i: number) =>
          i === id ? {...pkmn, hp: newHp} : pkmn
        )
      );
    }
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
      <CButton onPress={sendAttack} style={{flex: 1}}></CButton>
      <CVar name={wildName} hp={wildHp / wildBaseHp * 100} />
      <CText>{wildHp}</CText>
      <View style={styles.container}>
        <CText outlined size={20}>LVL {wildLevel}</CText>

        <CPokemon
          specie={wildSpecie}
          style={styles.front}
          trigger={wildTrigger}
          action={wildAction}
          hp={wildHp}
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
          hp={pkmnHp}
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
    marginBottom: 15
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
