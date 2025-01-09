import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { CText } from "../text/CText";
import { Pokemon } from "@/utils/battleFunctions/generatePokemonWithStats";
import { useEffect, useState } from "react";
import { delay } from "@/utils/delay";
import { CButton } from "../buttons/CButton";
import Arrow from '@/assets/images/misc/Arrow';
import { useRouter } from "expo-router";


export function CStats({team}: {team: Pokemon[]}) {
  const pokedata = require("@/assets/data/pokedata.json");
  const router = useRouter();
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons";
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [hidden, setHidden] = useState(true);

  const displayStats = async () => {
    for (let i = 0; i < team.length; i++) {
      setPokemon(prev => [...prev, team[i]]);
      await delay(500);
    }
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
      <View style={styles.button}>
        {hidden ? null : <CButton onPress={goBack}><CText size={40} outlined>GO BACK</CText></CButton>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    top: "20%",
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
    position: "absolute",
    alignSelf: "center",
    bottom: "10%",
    zIndex: 9999
  }
});
