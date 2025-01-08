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

import Pokeball from '@/assets/images/misc/Pokeball';
import SwitchButton from '@/assets/images/buttons/SwitchButton';
import { CPokeballButton } from "@/components/buttons/CPokeballButton";
import { State } from "react-native-gesture-handler";
import { CPadding } from "@/components/containers/CPadding";
import { DATABASE_SERVER_URI } from "@/constants/URI";
import { updatePokemonHp } from "@/utils/battleFunctions/updatePokemonHp";
import { useRouter } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Image } from "expo-image";


export default function Battle() {
  const effectLimit = 5;
  const opacitiy = useSharedValue(1);
  const teamOpacitiy = useSharedValue(0);
  const pokedata = require("@/assets/data/pokedata.json");
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons";
  const router = useRouter();

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacitiy.value,
  }));

  const teamAnimStyle = useAnimatedStyle(() => ({
    opacity: teamOpacitiy.value,
  }));

  const fadeOutAnim = (win?: boolean) => {
    opacitiy.value = 1;
    opacitiy.value = withTiming(0, {duration: 1000 });
    if (win) {
      teamOpacitiy.value = 0;
      teamOpacitiy.value = withTiming(1, {duration: 1000 });
    }
  };
  

  const {userId, team, weatherCondition, boost, setBoost, coins, setCoins} = useData();
  const [battleFlag, setBattleFlag] = useState(true);
  const [wobble, setWobble] = useState(0);
  const [pokeballTrhown, setPokeballTrhown] = useState(false);

  const [pokemon, setPokemon] = useState(() => generatePokemonWithStats(team));
  const [state, setState] = useState("first");
  const [trigger, setTrigger] = useState(0);
  const [pkmnIndex, setPkmnIndex] = useState(0);
  
  const [wildPokemon, setWildPokemon] = useState(() => generatePokemonWithStats(team, weatherCondition));
  const [wildState, setWildState] = useState("");
  const [wildTrigger, setWildTrigger] = useState(0);
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

  async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  useEffect(() => {
    const battleLoop = async () => {
      if (pokemon.length < 1) {
        return;
      }
      if (state == "first") {
        setState("");
        await delay(2000);
      }
      else if (battleFlag) {
        updatePokemonHp(setPokemon, pkmnIndex, pkmnHp, wildDamage, pkmnDefense);
        if (pkmnHp <= 0) {
          await delay(1000);
          switchPokemon(getNextIndex, "skipCheck");
        }
      }
      else {
        if ((state === "switch" || ["catch", "escape"].includes(wildState)) && !pokeballTrhown) {
          setWildState("");
          setBattleFlag(true);
        }
      }

      if (wildHp <= 0) {
        setCoins(coins + 1000);
        await delay(2000);
        if (wildIndex < wildPokemon.length - 1) {
          setWildIndex(wildIndex + 1);
          await delay(1500);
        } else {
          fadeOutAnim(true);
          setTimeout(() => {
            if (router.canGoBack()) {
              router.back();
            }
          }, 3000);
          
          return;
        }
      }

      await delay(randint(100, 1000));
      setWildTrigger(wildTrigger < effectLimit - 1 ? wildTrigger + 1 : 0);
    };

    battleLoop();
  }, [wildTrigger]);

  
  // throw pokeball

  const throwPokeball = async () => {
    if (wildHp <= 0 || coins < 50) return;
    setBattleFlag(false);
    setWildState("pokeball");
    setPokeballTrhown(true);
    setWobble(0);
    setCoins(coins - 50);

    for (let i = 1; i <= 3; i++) {
      await delay(i == 1 ? 2000 : 1000);
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
  };

  const sendAttack = () => {
    if (!battleFlag) return;
    const boostModifier = boost > 0 ? 3 : 1;
    setTrigger(trigger < effectLimit - 1 ? trigger + 1 : 0);
    setBoost(boost - 1);
    updatePokemonHp(setWildPokemon, wildIndex, wildHp, pkmnDamage * boostModifier, wildDefense);
  };

  const switchPokemon = (getIndex: (index: number, length: number) => number, skipCheck?: string) => {
    if (pkmnHp <= 0 && !skipCheck) return;
    setBattleFlag(false);
    setState("switch");

    let index = getIndex(pkmnIndex, pokemon.length);
    for (let i = 0; i <= pokemon.length && pokemon[index].hp <= 0; i++) {
      index = getIndex(index, pokemon.length);
      if (i == pokemon.length && router.canGoBack()) {
        fadeOutAnim();
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    }
    setPkmnIndex(index);
  };

  const getNextIndex = (index: number, length: number) => index < length - 1 ? index + 1 : 0;

  const getPrevIndex = (index: number, length: number) => index > 0 ? index - 1 : length - 1;

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
        switchPokemon(getNextIndex);
      } else if (translationX > 50 && velocityX > 0) {
        switchPokemon(getPrevIndex);
      }
    }
  };
  
  return (
    <CPadding>
      <CPreventBackButton />
      <Animated.View style={[styles.teamContainer, teamAnimStyle]}>
        {team.map((pkmn) => {
          return (
            <View style={styles.teamRow}>
              <Image style={styles.teamImage} source={`${imageUrl}/${pkmn.specie}.png`} />
              <CText size={30} outlined>{` ${pkmn.level} > ${pkmn.level + (pkmn.level < 100 ? 1 : 0)}`}</CText>
              {pkmn.level + (pkmn.level < 100 ? 1 : 0) == 6 ? (
                <Image style={styles.teamImage} source={`${imageUrl}/${pokedata[pkmn.specie].evolves_to[0]}.png`} />
              ) : null}
            </View>
          );
        })}
      </Animated.View>
      <Animated.View style={[styles.container, animStyle]}>
        <CGestureHandler onGestureEvent={handleGesture}>
          <TouchableWithoutFeedback onPress={sendAttack}>
            <View style={styles.battleArea}>
              <CVar name={wildName} hp={wildHp / wildBaseHp * 100} />
              <CText>{wildHp}</CText>
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
            </View>
          </TouchableWithoutFeedback>
        </CGestureHandler>
        <CControlPanel style={styles.buttons}>
          <CButton onPress={() => switchPokemon(getPrevIndex)}>
            <SwitchButton width={100} height={100} style={{transform: [{scaleX: -1}]}} />
          </CButton>
          <CPokeballButton onThrow={throwPokeball} wobble={wobble} canThrow={wildHp > 0 && coins >= 50} />
          <CButton onPress={() => switchPokemon(getNextIndex)}>
            <SwitchButton width={100} height={100} />
          </CButton>
        </CControlPanel>
      </Animated.View>
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
  teamContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    top: "20%",
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  teamImage: {
    height: 50,
    width: 50,
    transform: [{scaleX: -1}]
  }
});
