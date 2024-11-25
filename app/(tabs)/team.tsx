import { StyleSheet, View } from "react-native";
import { CBackground } from '@/components/CBackground';
import { CContainer } from "@/components/CContainer";
import { CButton } from "@/components/CButton";
import { BackButton } from "@/components/navigation/BackButton";
import { Image } from 'expo-image';
import axios from "axios";

import BoostButton from '@/assets/images/buttons/BoostButton';
import BattleButton from '@/assets/images/buttons/BattleButton';
import { useEffect, useState } from "react";
import { CText } from "@/components/CText";
import { CPokemonButton } from "@/components/CPokemonButton";

export default function Team() {
  const [pokemon, setPokemon] = useState([]);
  
  const fetchPokemon = async () => {
    const response = await axios.get("https://pokeweather.loca.lt/pokemon");
    setPokemon(response.data);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <CBackground>
      <BackButton />
      <View style={styles.container}>
        <CContainer>
          {pokemon.length > 0 ? (
            pokemon.map((pkmn, key) => {
              return (
                <CPokemonButton id={pkmn.id} key={key} />
              )
            })
          ) : (
            <CText size={50}>Loading...</CText>
          )}
        </CContainer>
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
  },
});
