const start = 1;
const limit = 18;
let txt = '{';

const fetchApi = async () => {
  const fetchPromises = [];

  for (let i = start; i <= limit; i++) {
    const typeUrl = `https://pokeapi.co/api/v2/type/${i}/`;

    fetchPromises.push(
      (async () => {
        try {
          const type = await fetch(typeUrl);
          const typeData = await type.json();

          const pokemonArr = typeData.pokemon
          .map(t => `${t.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)}`)
          .filter(id => parseInt(id) <= 807);

          const ddf = typeData.damage_relations.double_damage_from.map(t => `"${t.name}"`);
          const ddt = typeData.damage_relations.double_damage_to.map(t => `"${t.name}"`);
          const hdf = typeData.damage_relations.half_damage_from.map(t => `"${t.name}"`);
          const hdt = typeData.damage_relations.half_damage_to.map(t => `"${t.name}"`);
          const ndf = typeData.damage_relations.no_damage_from.map(t => `"${t.name}"`);
          const ndt = typeData.damage_relations.no_damage_to.map(t => `"${t.name}"`);

          txt += `"${typeData.name}": {` +
          `"double_damage_from": [${ddf}],` +
          `"double_damage_to": [${ddt}],` +
          `"half_damage_from": [${hdf}],` +
          `"half_damage_to": [${hdt}],` +
          `"no_damage_from": [${ndf}],` +
          `"no_damage_to": [${ndt}],` +
          `"pokemon": [${pokemonArr}]`
          txt += '},';
          console.log(i);
        } catch (error) {
          console.error('Error:', error);
        }
      })()
    );
  }

  await Promise.all(fetchPromises);
  txt = txt.slice(0, txt.length - 1) + '}';
  console.log(txt);
  const typeJson = JSON.parse(txt);
  console.log(typeJson);
};

fetchApi();
