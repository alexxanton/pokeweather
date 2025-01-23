import { AttackStatsType } from "./generatePokemonWithStats";

export const updatePokemonHp = (
  pokemon: React.Dispatch<React.SetStateAction<any>>,
  id: number,
  hp: number,
  damage: number,
  defense: number,
  attackType: AttackStatsType,
  opponentTypes: AttackStatsType[],
) => {
  let typeDamage = 0;

  opponentTypes.forEach(type => {
    if (type.double_damage_from.includes(attackType.name)) {
      typeDamage += 2;
    } else if (type.half_damage_from.includes(attackType.name)) {
      typeDamage += 0.5;
    } else if (type.no_damage_from.includes(attackType.name)) {
      typeDamage += 0;
    } else {
      typeDamage += 1;
    }
  });
  
  const newHp = hp - Math.round(typeDamage * damage / defense);
  if (hp > 0) {
    pokemon((prev: any) =>
      prev.map((pkmn: any, i: number) =>
        i === id ? {...pkmn, hp: newHp} : pkmn
      )
    );
  }
};
