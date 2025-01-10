import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { CText } from "../text/CText";
import { Pokemon } from "@/utils/battleFunctions/generatePokemonWithStats";
import { useEffect, useState } from "react";
import { delay } from "@/utils/delay";
import { CButton } from "../buttons/CButton";
import Arrow from '@/assets/images/misc/Arrow';
import { useRouter } from "expo-router";
import { useData } from "../CDataProvider";


export function CStats({team}: {team: Pokemon[]}) {
  const pokedata = require("@/assets/data/pokedata.json");
  const router = useRouter();
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons";
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [hidden, setHidden] = useState(true);
  const {coins, setCoins} = useData();

  const displayStats = async () => {
    for (let i = 0; i < team.length; i++) {
      setPokemon(prev => [...prev, team[i]]);
      await delay(500);
    }
    setCoins(coins + 3000);
    setHidden(false);
  }

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  useEffect(() => {
    displayStats();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {pokemon.map((pkmn, index) => {
          return (
            <View style={styles.row} key={index}>
              <Image style={[styles.image, styles.inverted]} source={`${imageUrl}/${pkmn.specie}.png`} />
              <CText size={30} outlined>{` ${pkmn.level} `}</CText>
              <Arrow />
              <CText size={30} outlined>{` ${pkmn.level + (pkmn.level < 100 ? 1 : 0)} `}</CText>
              {pkmn.level + (pkmn.level < 100 ? 1 : 0) == 6 ? (
                <Image style={styles.image} source={`${imageUrl}/${pokedata[pkmn.specie].evolves_to[0]}.png`} />
              ) : null}
            </View>
          );
        })}
      </View>
      {hidden ? null : (
        <CButton onPress={goBack} style={styles.button}>
          <CText size={20} outlined>Go Back</CText>
        </CButton>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: "60%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    height: 50,
    width: 50,
  },
  inverted: {
    transform: [{scaleX: -1}]
  },
  button: {
    alignSelf: "center",
    zIndex: 9999,
    marginTop: 20,
    backgroundColor: "#663399",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
