import { randint } from "./randint";


export function generateWildPokemon(weatherCondition:string) {
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const typeMap = require("@/assets/data/typemap.json");
  const states = typeMap[weatherCondition];
  const candidates = states.flatMap((state: number) => typesdata[state].pokemon);
  let randomPokemon: number[] = [];

  const pickRandomPokemon = () => {
    const randomPick = randint(0, candidates.length - 1);
    const candidate = candidates[randomPick];
    let accepted = true;

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
    let pokemonWithStats: {
      id: number,
      specie: number,
      level: number,
      hp: number,
      baseHp: number,
      attack: number,
      defense: number
    }[] = [];
    
    let id = 0;
    arr.forEach(specie => {
      id++;
      const level = randint(avg, max + 5);
      const baseHp = level * 10;
      const hp = baseHp;
      const attack = level * 5;
      const defense = level * 1.5;
      pokemonWithStats.push({id, specie, level, hp, baseHp, attack, defense});
    });
    return pokemonWithStats;
  };

  return generateStats(randomPokemon);
}
