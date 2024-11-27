import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/containers/CBackground';
import { CContainer } from "@/components/containers/CContainer";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";
import { CPokemonButton } from "@/components/buttons/CPokemonButton";
import { CScrollPanel } from "@/components/containers/CScrollPanel";
import { useData } from "@/components/CDataProvider";
import { CLabel } from "@/components/text/CLabel";
import { useEffect, useState } from "react";
import { uri } from '@/constants/URI';
import axios from "axios";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';


export default function Team() {
  const {pokemon, setPokemon} = useData();
  
  const fetchPokemon = async () => {
    const response = await axios.get(uri + "/pokemon");
    setPokemon(response.data);
  };

  useEffect(() => {
    if (pokemon.length < 0) {
    };
    fetchPokemon();
  }, []);

  return (
    <CBackground>
      <CArrowButton />
      <View style={styles.container}>
        <CLabel title="Team">
          <CContainer style={styles.team}>
          </CContainer>
        </CLabel>
        <CLabel title="Caught" style={styles.scroll}>
          <CScrollPanel>
            <View style={styles.grid}>
              {pokemon.length > 0 ? (
                pokemon.map((pkmn, idx) => {
                  return <CPokemonButton specie={pkmn.specie} key={idx} />
                })
              ) : (
                <CText size={50}>{uri}</CText>
              )}
            </View>
          </CScrollPanel>
        </CLabel>
      </View>
      <CContainer>
        <CButton href="/boost">
          <BoostButton width={135} height={90} />
        </CButton>
        <CButton href="/battle">
          <BattleButton width={135} height={90} />
        </CButton>
      </CContainer>
    </CBackground>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom: 30,
    gap: 10
  },
  scroll: {
    flex: 1,
    marginBottom: 20
  },
});
