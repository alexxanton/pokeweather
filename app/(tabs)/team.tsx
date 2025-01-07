import { BackHandler, StyleSheet, View } from "react-native";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CPokemonButton } from "@/components/buttons/CPokemonButton";
import { CScrollPanel } from "@/components/containers/CScrollPanel";
import { useData } from "@/components/CDataProvider";
import { CLabel } from "@/components/text/CLabel";
import React, { useEffect, useState } from "react";
import { CPadding } from '@/components/containers/CPadding';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import axios from "axios";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';
import { TransparentBlack } from "@/constants/TransparentBlack";
import { useRouter } from "expo-router";
import { Pokemon } from "@/utils/battleFunctions/generatePokemonWithStats";


export default function Team() {
  const {userId, team, setTeam, coins, setCoins, boost, setBoost} = useData();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [hidden, setHidden] = useState(false);
  
  const getPokemon = async () => {
    const team = await axios.get(`${DATABASE_SERVER_URI}/get-team/${userId}`);
    const pokemon = await axios.get(`${DATABASE_SERVER_URI}/pokemon/${userId}`);
    setTeam(team.data);
    setPokemon(pokemon.data);
  };

  const updateTeam = async () => {
    console.log(pokemon);
    const slots = [];
    for (let i = 0; i < 6; i++) {
      const pkmn = team[i];
      if (pkmn) {
        slots.push(pkmn.id);
      } else {
        slots.push(null);
      }
    }
    
    try {
      const response = await axios.put(`${DATABASE_SERVER_URI}/update-team/${userId}`, {
        slot_1: slots[0],
        slot_2: slots[1],
        slot_3: slots[2],
        slot_4: slots[3],
        slot_5: slots[4],
        slot_6: slots[5],
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (team.length > 0) {
      updateTeam();
    }
  }, [team]);

  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      setHidden(true);
      setTimeout(() => {
        router.back();
      }, 0);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);

  const addPokemon = (pkmn: Pokemon) => {
    if (team.length < 6 && !team.some((obj: any) => obj.id === pkmn.id)) {
      setTeam(prev  => [...prev, pkmn]);
    }
  };

  const removePokemon = (id: number) => {
    if (team.length > 1) {
      setTeam(prev => prev.filter((_: any, index: number) => index !== id));
    }
  };

  const switchPokemon = () => {
    setTeam((prev) => {
      const news = [...prev];
      return [];
    });
  };

  useEffect(() => {
    getPokemon();
    console.log(pokemon);
  }, []);

  const buyBoost = () => {
    setCoins(coins - (100 - boost));
    setBoost(100);
  };

  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
        <CLabel title="Team">
          <View style={styles.team}>
            {team.map((pkmn: any, idx: number) => {
              return <CPokemonButton
                specie={pkmn.specie}
                level={pkmn.level}
                key={idx}
                onPress={switchPokemon}
                onLongPress={() => removePokemon(idx)}
              />
            })}
          </View>
        </CLabel>
        <CLabel title="Caught" style={styles.label}>
          {hidden ? null : (
            <CScrollPanel
              data={pokemon}
              numColumns={6}
              initialNumToRender={1}
              windowSize={2.5}
              maxToRenderPerBatch={3}
              renderItem={({ item }) => (
                <CPokemonButton
                  specie={item.specie}
                  level={item.level}
                  // isOnTeam={team.some((obj: any) => obj.id === item.id)}
                  // onPress={() => addPokemon({id: item.id, specie: item.specie, level: item.level})}
                />
              )}
            />
          )}
        </CLabel>
      </View>
      <CControlPanel>
        <CButton onLongPress={() => {setBoost(0);setCoins(10000)}} onPress={() => {
          if (boost < 100) {
            setTimeout(() => {
              buyBoost();
            }, 100);
          }
        }}>
          <BoostButton width={135} height={90} />
        </CButton>
        <CButton href="/battle" onPress={() => setHidden(!hidden)}>
          <BattleButton width={135} height={90} />
        </CButton>
      </CControlPanel>
    </CPadding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
  },
  team: {
    marginBottom: 30,
    backgroundColor: TransparentBlack,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    gap: 5
  },
  label: {
    flex: 1,
    marginBottom: 20
  },
});
