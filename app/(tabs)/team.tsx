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
  const {userId, coins, setCoins, boost, setBoost, team, setTeam, collection, setCollection} = useData();
  
  const fetchPokemon = async () => {
    const teamResponse = await axios.get(`${DATABASE_SERVER_URI}/get-team/${userId}`);
    const pokemonResponse = await axios.get(`${DATABASE_SERVER_URI}/pokemon/${userId}`);
    setTeam(teamResponse.data);
    setCollection(pokemonResponse.data);
  };

  useEffect(() => {
    fetchPokemon();
    console.log(team);
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
              return <CPokemonButton specie={pkmn.specie} level={pkmn.level} key={idx} />
            })}
          </View>
        </CLabel>
        <CLabel title="Caught" style={styles.label}>
          <CScrollPanel
            data={collection}
            numColumns={6}
            initialNumToRender={1}
            windowSize={2.5}
            maxToRenderPerBatch={3}
            renderItem={({ item }) => (
              <CPokemonButton specie={item.specie} level={item.level} />
            )}
          />
        </CLabel>
      </View>
      <CControlPanel>
        <CButton onLongPress={() => {setBoost(0);setCoins(-1000)}} onPress={() => {
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
    justifyContent: "center"
  },
  label: {
    flex: 1,
    marginBottom: 20
  },
});
