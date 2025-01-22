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
import SwitchButton from '@/assets/images/buttons/SwitchButton';
import { TransparentBlack } from "@/constants/TransparentBlack";
import { Pokemon } from "@/utils/battleFunctions/generatePokemonWithStats";
import { CText } from "@/components/text/CText";
import { Image } from "expo-image";


export default function Team() {
  const {userId, team, setTeam, coins, setCoins, boost, setBoost} = useData();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState(0);
  const [orderByLevel, setOrderByLevel] = useState(false);
  const [levelDisplay, setLevelDisplay] = useState<Pokemon>();
  const levelDisplayImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${levelDisplay?.specie}.png`;
  
  const getPokemon = async () => {
    const team = await axios.get(`${DATABASE_SERVER_URI}/get-team/${userId}`);
    const pokemon = await axios.get(`${DATABASE_SERVER_URI}/pokemon/${userId}`, {
      params: {order: orderByLevel ? "level DESC" : "specie"}
    });
    setTeam(team.data);
    setPokemon(pokemon.data);
  };

  const updateTeam = async () => {
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
  }, [orderByLevel]);

  const buyBoost = () => {
    setCoins(coins - (100 - boost));
    setBoost(100);
  };

  const orderPokemon = () => {
    setPokemon([]);
    setOrderByLevel(!orderByLevel);
  };

  const handlePressIn = (level: Pokemon) => {
    setLevelDisplay(level);
  };

  return (
    <CPadding>
      <View style={styles.container}>
      <CArrowButton />
      <View style={styles.levelDisplay}>
        <Image
          source={levelDisplayImage}
          style={styles.levelDisplayImage}
        />
        <CText outlined>{levelDisplay?.level}</CText>
      </View>
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
            data={pokemon.slice(pagination, pagination + 30)}
            numColumns={6}
            initialNumToRender={1}
            windowSize={2.5}
            maxToRenderPerBatch={3}
            renderItem={({ item }) => (
              <CPokemonButton
                specie={item.specie}
                level={item.level}
                isOnTeam={team.some((obj: Pokemon) => obj.id === item.id)}
                onPress={() => addPokemon({id: item.id, specie: item.specie, level: item.level})}
                onPressIn={() => handlePressIn(item)}
              />
            )}
          />
          <View style={styles.paginationButtons}>
            <CButton onPress={() => {if (pagination > 0) setPagination(pagination - 30)}} style={{transform: [{scaleX: -1}]}}>
              <SwitchButton height={75} width={75} />
            </CButton>
            <CButton style={styles.button} onPress={orderPokemon}>
                <CText outlined>{orderByLevel ? "Order by level" : "Order by specie"}</CText>
            </CButton>
            <CButton onPress={() => {if (pagination < pokemon.length - 30) setPagination(pagination + 30)}}>
              <SwitchButton height={75} width={75} />
            </CButton>
          </View>
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
  paginationButtons: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center"
  },
  button: {
    alignSelf: "center",
    zIndex: 9999,
    backgroundColor: "#663399",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelDisplay: {
    position: "absolute",
    alignSelf: "center",
  },
  levelDisplayImage: {
    position: "absolute",
    width: 50,
    height: 50,
  }
});
