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
  const {collection, setCollection} = useData();
  
  const fetchPokemon = async () => {
    const response = await axios.get(`${DATABASE_SERVER_URI}/pokemon/${1}`);
    setCollection(response.data);
  };

  useEffect(() => {
    if (collection.length < 0) {
    };
    fetchPokemon();
  }, []);

  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
        <CLabel title="Team">
          <View style={styles.team}>
          </View>
        </CLabel>
        <CLabel title="Caught" style={styles.label}>
          <CScrollPanel
            data={collection}
            numColumns={6}
            initialNumToRender={1}
            renderItem={({ item }) => (
              <CPokemonButton specie={item.specie} />
            )}
          />
        </CLabel>
      </View>
      <CControlPanel>
        <CButton>
          <BoostButton width={135} height={90} />
        </CButton>
        <CButton href="/battle">
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
    padding: 40,
    marginBottom: 30,
    backgroundColor: TransparentBlack,
    flexDirection: "row",
    borderRadius: 15,
  },
  label: {
    flex: 1,
    marginBottom: 20
  },
});
