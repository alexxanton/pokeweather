import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CContainer } from "@/components/CContainer";
import { CButton } from "@/components/CButton";
import { BackButton } from "@/components/navigation/BackButton";
import axios from "axios";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';
import { useEffect, useState } from "react";
import { CText } from "@/components/CText";
import { CPokemonButton } from "@/components/CPokemonButton";
import { CScrollPanel } from "@/components/CScrollPanel";
import { useData } from "@/components/CDataProvider";
import CLabel from "@/components/CLabel";

export default function Team() {
  const {pokemon, setPokemon} = useData();
  
  const fetchPokemon = async () => {
    const response = await axios.get("http://192.168.0.243:3001/pokemon");
    setPokemon(response.data);
  };

  useEffect(() => {
    if (pokemon.length < 0) {
    }
    fetchPokemon();
  }, []);

  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>
        <CLabel title="Team">
          <CContainer style={styles.team}>
          </CContainer>
        </CLabel>
        <CLabel title="Caught">
          <CScrollPanel style={styles.scroll}>
            <View style={styles.grid}>
              {pokemon.length > 0 ? (
                pokemon.map((pkmn, key) => {
                  return (
                    <CPokemonButton id={pkmn.specie} key={key} />
                  )
                })
              ) : (
                <CText size={50}>Loading...</CText>
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
    padding:40,
    marginBottom: 20
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom: 100,
    gap: 10
  },
  scroll: {
    marginBottom: 20
  },
});
