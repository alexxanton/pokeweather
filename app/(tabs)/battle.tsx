import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { CGestureHandler } from '@/components/containers/CGestureHandler';
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
import { CPokeballButton } from "@/components/buttons/CPokeballButton";
import { State } from "react-native-gesture-handler";
import { AttackType } from "@/components/battle/CAttackEffect"; // Adjust the import path as necessary
import { CPadding } from "@/components/containers/CPadding";
import { DATABASE_SERVER_URI } from "@/constants/URI";


export default function Battle() {
  const effectLimit = 5;

  const {userId, weatherCondition, boost, setBoost} = useData();
  const [control, setControl] = useState(true);
  const [effectIndex, setEffectIndex] = useState(0);
  const [wobble, setWobble] = useState(0);

  const [pokemon, setPokemon] = useState(() => generateWildPokemon(weatherCondition));
  const [action, setAction] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(() => generateWildPokemon(weatherCondition));
  const [wildAction, setWildAction] = useState("");
  const [wildTrigger, setWildTrigger] = useState(true);
  const [wildIndex, setWildIndex] = useState(0);

  const wildSpecie = useMemo(() => wildPokemon[wildIndex].specie, [wildIndex]);
  const wildName = useMemo(() => wildPokemon[wildIndex].name, [wildSpecie]);
  const wildHp = useMemo(() => wildPokemon[wildIndex].hp, [wildPokemon, wildIndex]);
  const wildBaseHp = useMemo(() => wildPokemon[wildIndex].baseHp, [wildIndex]);
  const wildLevel = useMemo(() => wildPokemon[wildIndex].level, [wildIndex]);
  const wildDamage = useMemo(() => wildPokemon[wildIndex].attack, [wildIndex]);
  const wildDefense = useMemo(() => wildPokemon[wildIndex].defense, [wildIndex]);
  const wildTypes = useMemo(() => wildPokemon[wildIndex].types, [wildIndex]);

  const pkmnSpecie = useMemo(() => pokemon[pkmnIndex].specie, [pkmnIndex]);
  const pkmnName = useMemo(() => pokemon[pkmnIndex].name, [pkmnSpecie]);
  const pkmnHp = useMemo(() => pokemon[pkmnIndex].hp, [pokemon, pkmnIndex]);
  const pkmnBaseHp = useMemo(() => pokemon[pkmnIndex].baseHp, [pkmnIndex]);
  const pkmnLevel = useMemo(() => pokemon[pkmnIndex].level, [pkmnIndex]);
  const pkmnDamage = useMemo(() => pokemon[pkmnIndex].attack, [pkmnIndex]);
  const pkmnDefense = useMemo(() => pokemon[pkmnIndex].defense, [pkmnIndex]);
  const pkmnTypes = useMemo(() => pokemon[pkmnIndex].types, [pkmnIndex]);

  async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  useEffect(() => {
    const wildPokemonLoop = async () => {
      if (wildHp <= 0) {
        await delay(2000);
        if (wildIndex < wildPokemon.length - 1) {
          setWildIndex(wildIndex + 1);
          await delay(1500);
          setWildTrigger(!wildTrigger);
        }
      } else {
        if (!control) return;
        await delay(randint(100, 1000));
        setWildTrigger(!wildTrigger);
        updatePokemonHp(setPokemon, pkmnIndex, pkmnHp, wildDamage*5, pkmnDefense);
        if (pkmnHp <= 0) {
          await delay(1000);
          switchPokemon(getNextIndex);
        }
      }
    };

    wildPokemonLoop();
  }, [wildTrigger]);

  const sendAttack = () => {
    if (!control) return;
    const boostModifier = boost > 0 ? 3 : 1;
    setTrigger(!trigger); // alternate between true and false so react detects a change and rerenders
    setEffectIndex(effectIndex < effectLimit - 1 ? effectIndex + 1 : 0);
    setBoost(boost - 1);
    updatePokemonHp(setWildPokemon, wildIndex, wildHp, pkmnDamage * boostModifier, wildDefense);
  };

  const sendSignal = (setSignal: React.Dispatch<React.SetStateAction<any>>, signal: string) => {
    setSignal(signal);
    setTimeout(() => {
      setSignal("");
    }, 100);
  };

  const updatePokemonHp = (
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

  const switchPokemon = (getIndex: (index: number, length: number) => number) => {
    setControl(false);
    let index = getIndex(pkmnIndex, pokemon.length);
    for (let i = 0; i < pokemon.length - 1 && pokemon[index].hp <= 0; i++) {
      index = getIndex(index, pokemon.length);
    }
    setPkmnIndex(index);
    setControl(true);
  };

  const getNextIndex = (index: number, length: number) => index < length - 1 ? index + 1 : 0;

  const getPrevIndex = (index: number, length: number) => index > 0 ? index - 1 : length - 1;

  const throwPokeball = async () => {
    setControl(false);
    sendSignal(setWildAction, "catch");
    setWobble(0);
    for (let i = 0; i < 3; i++) {
      await delay(2000 - (i == 0 ? 0 : 1000));
      setWobble((prevWobble) => prevWobble + 1);
    }
  };

  const catchPokemon = async () => {
    try {
      const response = await axios.post(`${DATABASE_SERVER_URI}/catch-pokemon`, {
        wildSpecie,
        wildLevel,
        userId
      });
      if (wildIndex < wildPokemon.length - 1) {
        setWildIndex(wildIndex + 1);
        await delay(1500);
        setWildTrigger(!wildTrigger);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGesture = (event: any) => {
    const { translationX, velocityX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX < -50 && velocityX < 0) {
        switchPokemon(getNextIndex);
      } else if (translationX > 50 && velocityX > 0) {
        switchPokemon(getPrevIndex);
      }
    }
  };
  
  return (
    <CPadding>
      <CPreventBackButton />
      <CGestureHandler onGestureEvent={handleGesture}>
        <TouchableWithoutFeedback onPress={sendAttack}>
          <View style={styles.touchableContainer}>
            <CVar name={wildName} hp={wildHp / wildBaseHp * 100} />
            <CText>{wildHp}</CText>
            <View style={styles.battleContainer}>
              <CText outlined size={20}>LVL {wildLevel}</CText>

              <CPokemon
                specie={wildSpecie}
                style={styles.front}
                action={wildAction}
                trigger={wildTrigger}
                hp={wildHp}
                wild
              >
                {[...Array(effectLimit)].map((_, i) => {
                  return <CAttackEffect
                    trigger={trigger}
                    effectIndex={effectIndex}
                    num={i}
                    key={i}
                    type={pkmnTypes[randint(0, pkmnTypes.length - 1)] as AttackType}
                  />
                })}
              </CPokemon>

              <CPokemon
                specie={pkmnSpecie}
                style={styles.back}
                trigger={trigger}
                hp={pkmnHp}
              >
                <CAttackEffect trigger={wildTrigger} type={wildTypes[randint(0, wildTypes.length - 1)] as AttackType} />
              </CPokemon>

              <CText outlined size={20} style={styles.level}>{`LVL ${pkmnLevel}`}</CText>
            </View>
            <CVar name={pkmnName} hp={pkmnHp / pkmnBaseHp * 100} style={styles.bottomVar} />
          </View>
        </TouchableWithoutFeedback>
      </CGestureHandler>
      <CControlPanel style={styles.buttons}>
        <CButton onPress={() => switchPokemon(getPrevIndex)}>
          <SwitchButton width={100} height={100} style={{transform: [{scaleX: -1}]}} />
        </CButton>
        <CPokeballButton onThrow={throwPokeball} wobble={wobble} />
        <CButton onPress={() => switchPokemon(getNextIndex)}>
          <SwitchButton width={100} height={100} />
        </CButton>
      </CControlPanel>
    </CPadding>
  );
}

const styles = StyleSheet.create({
  battleContainer: {
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
    gap: 20,
    backgroundColor: "transparent"
  },
  touchableContainer: {
    flex: 1
  }
});
