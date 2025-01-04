import { StyleSheet, View } from "react-native";
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


export default function Team() {
  const {userId, coins, setCoins, boost, setBoost} = useData();
  const [team, setTeam] = useState<Record<string, any>[]>([]);
  const [pokemon, setPokemon] = useState<Record<string, any>[]>([]);
  
  const getPokemon = async () => {
    const team = await axios.get(`${DATABASE_SERVER_URI}/get-team/${userId}`);
    const pokemon = await axios.get(`${DATABASE_SERVER_URI}/pokemon/${userId}`);
    setTeam(team.data);
    setPokemon(pokemon.data);
  };

  const updateTeam = async () => {
    console.log(team);
    
    try {
      const response = await axios.put(`${DATABASE_SERVER_URI}/update-team/`, {
        slot_1: team[0].id,
        slot_2: team[1].id ?? null,
        slot_3: team[2].id ?? null,
        slot_4: team[3].id ?? null,
        slot_5: team[4].id ?? null,
        slot_6: team[5].id ?? null,
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(team[0].id);
    
    updateTeam();
  }, [team]);

  const addPokemon = (pkmn: Record<string, any>) => {
    if (team.length < 6 && !team.some(obj => obj.id === pkmn.id)) {
      setTeam(prev => [...prev, pkmn]);
    }
  };

  const removePokemon = (id: number) => {
    if (team.length > 1) {
      setTeam(prev => prev.filter((_, index) => index !== id));
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
                isOnTeam={team.some(obj => obj.id === item.id)}
                onPress={() => addPokemon({id: item.id, specie: item.specie, level: item.level})}
              />
            )}
          />
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
        <CButton href="/battle" replace>
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
