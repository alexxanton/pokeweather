import { StyleSheet, View } from "react-native";
import { CControlPanel } from "@/components/containers/CControlPanel";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CPokemonButton } from "@/components/buttons/CPokemonButton";
import { CScrollPanel } from "@/components/containers/CScrollPanel";
import { useData } from "@/components/CDataProvider";
import { CLabel } from "@/components/text/CLabel";
import { useEffect, useState } from "react";
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { CPadding } from '@/components/containers/CPadding';
import axios from "axios";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';


export default function Team() {
  const {pokemon, setPokemon} = useData();
  
  const fetchPokemon = async () => {
    const response = await axios.get(DATABASE_SERVER_URI + "/pokemon");
    setPokemon(response.data);
  };

  useEffect(() => {
    if (pokemon.length < 0) {
    };
    fetchPokemon();
  }, []);

  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
        <CLabel title="Team">
          <CControlPanel style={styles.team}>
          </CControlPanel>
        </CLabel>
        <CLabel title="Caught" style={styles.label}>
          <CScrollPanel
            data={pokemon}
            numColumns={6}
            initialNumToRender={1}
            renderItem={({ item }) => (
              <CPokemonButton specie={item.specie} />
            )}
          />
        </CLabel>
      </View>
      <CControlPanel>
        <CButton href="/boost">
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
    marginBottom: 30
  },
  label: {
    flex: 1,
    marginBottom: 20
  },
});
