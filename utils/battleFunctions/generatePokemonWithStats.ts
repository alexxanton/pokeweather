import { randint } from "../randint";
import { AttackType } from "@/components/battle/CAttackEffect";

export type Pokemon = {id: number, level: number, specie: number};

export type AttackStatsType = {
  name: AttackType,
  double_damage_from: string[],
  double_damage_to: string[],
  half_damage_from: string[],
  half_damage_to: string[],
  no_damage_from: string[],
  no_damage_to: string[]
};


export function generatePokemonWithStats(team: Pokemon[], weatherCondition?: string) {
  const pokedata = require("@/assets/data/pokedata.json");
  const typesdata = require("@/assets/data/typesdata.json");
  const typeMap = require("@/assets/data/typemap.json");
  const pokemon: Pokemon[] = [];
  
  const pickRandomPokemon = () => {
    if (!weatherCondition) return;
    const states = typeMap[weatherCondition];
    const candidates = states.flatMap((state: number) => typesdata[state].pokemon);

    const pkmnLevels = team.map((pkmn: Pokemon) => pkmn.level);
    const sum = pkmnLevels.reduce((acc: any, num: any) => acc + num, 0);
    const avg = Math.round(sum / pkmnLevels.length);
    const maxLevel = Math.max(...pkmnLevels);
    const max = maxLevel < 99 ? 2 : 0
    
    let index = 1;
    while (index <= team.length) {
      const randomPick = candidates[randint(0, candidates.length - 1)];
      let accepted = true;

      if (pokedata[randomPick].is_legendary) {
        if (randint(0, 100) != 1) {
          accepted = false;
        }
      }
      
      if (accepted) {
        pokemon.push({id: index, level: randint(avg, max), specie: randomPick});
        index++;
      }
    }
  };

  const generateStats = (arr: Pokemon[]) => {
    const pokemonWithStats: {
      id: number,
      specie: number,
      name: string,
      level: number,
      hp: number,
      baseHp: number,
      attack: number,
      defense: number,
      types: AttackStatsType[],
    }[] = [];
    
    arr.forEach(pkmn => {
      const id = pkmn.id;
      const specie = pkmn.specie;
      const name = pokedata[specie].name;
      const level = pkmn.level;
      const baseHp = 100;
      const hp = baseHp;
      const attack = level * 5;
      const defense = level * 1.5;
      const types = pokedata[specie].types.map((type: string) => ({
        name: type as AttackType,
        double_damage_from: typesdata[type].double_damage_from,
        double_damage_to: typesdata[type].double_damage_to,
        half_damage_from: typesdata[type].half_damage_from,
        half_damage_to: typesdata[type].half_damage_to,
        no_damage_from: typesdata[type].no_damage_from,
        no_damage_to: typesdata[type].no_damage_to
      }));

      pokemonWithStats.push({id, specie, name, level, hp, baseHp, attack, defense, types});
    });
    
    return pokemonWithStats;
  };
  

  if (weatherCondition) {
    pickRandomPokemon();
  } else {
    team.forEach((pkmn: Pokemon) => {
      pokemon.push(pkmn);
    });
  }

  return generateStats(pokemon);
}
