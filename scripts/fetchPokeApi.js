const start = 1000;
const limit = 1025;
let txt = '{';

const fetchApi = async () => {
  for (let i = start; i <= limit; i++) {
    const pkmnUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;

    try {
      const pkmn = await fetch(pkmnUrl);
      const species = await fetch(speciesUrl);
      const pkmnData = await pkmn.json();
      const speciesData = await species.json();

      const evoUrl = speciesData.evolution_chain.url;
      const evo = await fetch(evoUrl);
      const evoData = await evo.json();

      const getEvolvesInto = (chain, name) => {
        if (chain.species.name === name) {
          return chain.evolves_to.map(evo => evo.species.name); // Get names of next evolutions
        }
        for (const next of chain.evolves_to) {
          const result = getEvolvesInto(next, name);
          if (result) return result;
        }
        return null;
      };

      const types = pkmnData.types.map(t => `"${t.type.name}"`);
      const evolvesInto = getEvolvesInto(evoData.chain, pkmnData.name) || [];

      txt +=
        `"${pkmnData.id}": {"name":"${pkmnData.name}",` +
        `"types": [${types}],` +
        `"evolves_into": [${evolvesInto.map(evo => `"${evo}"`).join(',')}],` +
        `"capture_rate": ${speciesData.capture_rate},` +
        `"is_legendary": ${speciesData.is_legendary}` +
        `}`;
      if (i < limit) txt += ',';
      console.log(i)
    }
    catch (error) {
      console.error('Error.', error);
    }
  }

  txt += '}';
  console.log(txt);
  const pkmnData = JSON.parse(txt);
  console.log(pkmnData);
};

fetchApi();
