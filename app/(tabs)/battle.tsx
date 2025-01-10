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
import { generatePokemonWithStats } from "@/utils/battleFunctions/generatePokemonWithStats";
import axios from "axios";

import SwitchButton from '@/assets/images/buttons/SwitchButton';
import { CPokeballButton } from "@/components/buttons/CPokeballButton";
import { State } from "react-native-gesture-handler";
import { CPadding } from "@/components/containers/CPadding";
import { DATABASE_SERVER_URI } from "@/constants/URI";
import { updatePokemonHp } from "@/utils/battleFunctions/updatePokemonHp";
import { useRouter } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CStats } from "@/components/battle/CStats";
import { delay } from "@/utils/delay";
import CMusic from "@/components/CMusic";


export default function Battle() {
  const effectLimit = 5;
  const opacitiy = useSharedValue(1);
  const router = useRouter();

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacitiy.value,
  }));

  const fadeOutAnim = () => {
    opacitiy.value = 1;
    opacitiy.value = withTiming(0, {duration: 1000 });
  };
  

  const {userId, team, weatherCondition, boost, setBoost, coins, setCoins} = useData();
  const [battleFlag, setBattleFlag] = useState(false);
  const [wobble, setWobble] = useState(0);
  const [pokeballTrhown, setPokeballTrhown] = useState(false);
  const [switchDirection, setSwitchDirection] = useState("");
  const [switchIndex, setSwitchIndex] = useState(0);
  const [win, setWin] = useState(false);

  const [pokemon, setPokemon] = useState(() => generatePokemonWithStats(team));
  const [state, setState] = useState("first");
  const [trigger, setTrigger] = useState(-1);
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(() => generatePokemonWithStats(team, weatherCondition));
  const [wildState, setWildState] = useState("");
  const [wildTrigger, setWildTrigger] = useState(-1);
  const [wildIndex, setWildIndex] = useState(0);

  const wildSpecie = useMemo(() => wildPokemon[wildIndex].specie, [wildIndex]);
  const wildName = useMemo(() => wildPokemon[wildIndex].name, [wildSpecie]);
  const wildHp = useMemo(() => wildPokemon[wildIndex].hp, [wildPokemon, wildIndex]);
  const wildBaseHp = useMemo(() => wildPokemon[wildIndex].baseHp, [wildIndex]);
  const wildLevel = useMemo(() => wildPokemon[wildIndex].level, [wildIndex]);
  const wildDamage = useMemo(() => wildPokemon[wildIndex].attack, [wildIndex]);
  const wildDefense = useMemo(() => wildPokemon[wildIndex].defense, [wildIndex]);
  const wildTypes = useMemo(() => wildPokemon[wildIndex].types, [wildIndex]);
  const wildAttackType = useMemo(() => wildTypes[randint(0, wildTypes.length - 1)], [wildTrigger]);

  const pkmnSpecie = useMemo(() => pokemon[pkmnIndex].specie, [pkmnIndex]);
  const pkmnName = useMemo(() => pokemon[pkmnIndex].name, [pkmnSpecie]);
  const pkmnHp = useMemo(() => pokemon[pkmnIndex].hp, [pokemon, pkmnIndex]);
  const pkmnBaseHp = useMemo(() => pokemon[pkmnIndex].baseHp, [pkmnIndex]);
  const pkmnLevel = useMemo(() => pokemon[pkmnIndex].level, [pkmnIndex]);
  const pkmnDamage = useMemo(() => pokemon[pkmnIndex].attack, [pkmnIndex]);
  const pkmnDefense = useMemo(() => pokemon[pkmnIndex].defense, [pkmnIndex]);
  const pkmnTypes = useMemo(() => pokemon[pkmnIndex].types, [pkmnIndex]);
  const pkmnAttackType = useMemo(() => pkmnTypes[randint(0, pkmnTypes.length - 1)], [trigger]);

  
  

  useEffect(() => {
    const battleLoop = async () => {
      if (switchDirection) {
        setPkmnIndex(switchIndex);
        setSwitchDirection("");
        setState("");
        setTimeout(() => {
          setBattleFlag(true);
        }, 1000);
      }

      if (battleFlag && wildHp > 0) {
        updatePokemonHp(setPokemon, pkmnIndex, pkmnHp, wildDamage, pkmnDefense);
        if (pkmnHp <= 0) {
          const skipCheck = true;
          await delay(1000);
          switchPokemon("next", skipCheck);
        }
      } else if (state === "first") {
        if (team.length < 1) {
          return;
        }
        setBattleFlag(true);
        setState("");
        await delay(500);
      }

      if (pokeballTrhown) {
        setWobble(0);

        for (let i = 1; i <= 3; i++) {
          await delay(i == 1 ? 1500 : 1000);
          setWobble(i);
        }

        await delay(1000);
        if (randint(1, 1) == 10) {
          setWobble(4); // triggers catch animation
          catchPokemon();
          setWildState("catch");
        } else {
          setWobble(-1); // triggers escape animation
          setWildState("escape");
        }
        setPokeballTrhown(false);
        setBattleFlag(true);
      }

      if (wildHp <= 0) {
        setCoins(coins + 1000);
        await delay(2000);
        if (wildIndex < wildPokemon.length - 1) {
          setWildIndex(wildIndex + 1);
          await delay(1500);
        } else {
          fadeOutAnim();
          setTimeout(() => {
            setWin(true);
          }, 1000);
          
          return;
        }
      }

      await delay(randint(100, 1000));
      setWildTrigger(wildTrigger < effectLimit - 1 ? wildTrigger + 1 : 0);
    };

    battleLoop();
  }, [wildTrigger]);

  const throwPokeball = async () => {
    if (wildHp <= 0 || coins < 50) return;
    setPokeballTrhown(true);
    setBattleFlag(false);
    setWildState("pokeball");
    setCoins(coins - 50);
  };

  const handleTap = () => {
    if (!battleFlag) return;
    if (wildHp > 0) {
      const boostModifier = boost > 0 ? 3 : 1;
      setTrigger(trigger < effectLimit - 1 ? trigger + 1 : 0);
      setBoost(boost - 1);
      updatePokemonHp(setWildPokemon, wildIndex, wildHp, pkmnDamage * boostModifier, wildDefense);
    }
  };

  const switchPokemon = (direction: string, skipCheck?: boolean) => {
    const getNextIndex = (index: number, length: number) => index < length - 1 ? index + 1 : 0;
    const getPrevIndex = (index: number, length: number) => index > 0 ? index - 1 : length - 1;

    if (pkmnHp <= 0 && !skipCheck) return;
    const getIndex = direction === "next" ? getNextIndex : getPrevIndex;
    let index = getIndex(pkmnIndex, pokemon.length);
    setBattleFlag(false);

    for (let i = 0; i <= pokemon.length && pokemon[index].hp <= 0; i++) {
      index = getIndex(index, pokemon.length);
      if (i == pokemon.length) {
        fadeOutAnim();
        setTimeout(() => {
          if (router.canGoBack()) {
            router.back();
          }
        }, 1000);
        return;
      }
    }

    if (skipCheck) {
      setPkmnIndex(index);
      setBattleFlag(true);
    } else {
      setSwitchIndex(index);
      setState(direction);
      setSwitchDirection(direction);
    }
  };

  const catchPokemon = async () => {
    try {
      const response = await axios.post(`${DATABASE_SERVER_URI}/catch-pokemon`, {
        specie: wildSpecie,
        level: wildLevel,
        id: userId
      });
      if (wildIndex < wildPokemon.length - 1) {
        setWildIndex(wildIndex + 1);
        await delay(1500);
        // setWildTrigger(!wildTrigger);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGesture = (event: any) => {
    const { translationX, velocityX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX < -50 && velocityX < 0) {
        switchPokemon("prev");
      } else if (translationX > 50 && velocityX > 0) {
        switchPokemon("next");
      }
    }
  };
  
  return (
    <CPadding>
      <CMusic />
      {!win ? <CPreventBackButton /> : <CStats team={team} />}
      <CGestureHandler onGestureEvent={handleGesture}>
        <TouchableWithoutFeedback onPress={handleTap}>
          <Animated.View style={[styles.battleArea, animStyle]}>
            <CVar name={wildName} hp={wildHp / wildBaseHp * 100} />
            <View style={styles.container}>
              <CText outlined size={20}>LVL {wildLevel}</CText>

              <CPokemon
                specie={wildSpecie}
                style={styles.front}
                state={wildState}
                trigger={wildTrigger}
                hp={wildHp}
                battleFlag={battleFlag}
                wild
              >
                {[...Array(effectLimit)].map((_, index) => {
                  return <CAttackEffect
                    trigger={trigger}
                    effectIndex={trigger}
                    num={index}
                    key={index}
                    battleFlag={battleFlag}
                    type={pkmnAttackType.name}
                  />
                })}
              </CPokemon>

              <CPokemon
                specie={pkmnSpecie}
                state={state}
                style={styles.back}
                trigger={trigger}
                hp={pkmnHp}
                battleFlag={battleFlag}
              >
                {[...Array(effectLimit)].map((_, index) => {
                  return <CAttackEffect
                    trigger={wildTrigger}
                    effectIndex={wildTrigger}
                    num={index}
                    key={index}
                    battleFlag={battleFlag}
                    type={wildAttackType.name}
                  />
                })}
              </CPokemon>

              <CText outlined size={20} style={styles.level}>{`LVL ${pkmnLevel}`}</CText>
            </View>
            <CVar name={pkmnName} hp={pkmnHp / pkmnBaseHp * 100} style={styles.bottomVar} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </CGestureHandler>
      <CControlPanel style={styles.buttons}>
        <CButton onPress={() => switchPokemon("prev")}>
          <SwitchButton width={100} height={100} style={{transform: [{scaleX: -1}]}} />
        </CButton>
        <CPokeballButton onThrow={throwPokeball} wobble={wobble} canThrow={wildHp > 0 && coins >= 50} />
        <CButton onPress={() => switchPokemon("next")}>
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
    gap: 20,
    backgroundColor: "transparent"
  },
  battleArea: {
    flex: 1
  },
});
