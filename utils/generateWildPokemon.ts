import { useData } from "@/components/CDataProvider";
import { randint } from "./randint";


export function generateWildPokemon() {
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const typeMap = require("@/assets/data/typemap.json");
  const {condition} = useData();
  const states = typeMap[condition];
  const candidates = states.flatMap((state: number) => typesdata[state].pokemon);
  let randomPokemon: number[] = [];

  const pickRandomPokemon = () => {
    const randomPick = randint(0, candidates.length - 1);
    const candidate = candidates[randomPick];
    let accepted = true;
    console.log(candidate)
    if (pokedata[candidate].is_legendary) {
      if (randint(0, 100) != 1) {
        accepted = false;
      }
    }
    
    if (accepted) {
      randomPokemon.push(candidate);
    } else {
      pickRandomPokemon();
    }
  };
  
  for (let i = 0; i < 6; i++) {
    pickRandomPokemon();
  }
  
  const getLevelAvg = () => {
    const avg = 10;
    const max = 15;
    return {avg, max};
  };

  const avg = getLevelAvg().avg;
  const max = getLevelAvg().max;
  
  const generateStats = (arr: number[]) => {
    let stats: object[] = [];
    arr.forEach(pkmn => {
      const level = randint(avg, max);
      const hp = level * 10;
      const attack = level * 2;
      stats.push({pkmn, hp, attack});
    });
    return stats;
  };

  generateStats(randomPokemon);
  return randomPokemon;
}