export const updatePokemonHp = (
  pokemon: React.Dispatch<React.SetStateAction<any>>,
  id: number,
  hp: number,
  damage: number,
  defense: number
) => {
  const newHp = hp - Math.round(damage / defense);
  if (hp > 0) {
    pokemon((prev: any) =>
      prev.map((pkmn: any, i: number) =>
        i === id ? {...pkmn, hp: newHp} : pkmn
      )
    );
  }
};
