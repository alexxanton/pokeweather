const start = 1;
const limit = 807;
let txt = '{';

const fetchApi = async () => {
  const fetchPromises = [];

  for (let i = start; i <= limit; i++) {
    const pkmnUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;

    fetchPromises.push(
      (async () => {
        try {
         
          const pkmnResponse = await fetch(pkmnUrl);
          const speciesResponse = await fetch(speciesUrl);
          const pkmnData = await pkmnResponse.json();
          const speciesData = await speciesResponse.json();

         
          const evoUrl = speciesData.evolution_chain.url;
          const evoResponse = await fetch(evoUrl);
          const evoData = await evoResponse.json();

         
          const getEvolvesTo = (chain, name) => {
            if (chain.species.name === name) {
              return chain.evolves_to.map(evo => {
                const urlParts = evo.species.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 2]);
                const minLevel = evo.evolution_details[0]?.min_level || null;
                return { id, minLevel };
              });
            }

           
            for (const next of chain.evolves_to) {
              const result = getEvolvesTo(next, name);
              if (result) return result;
            }

            return null;
          };

         
          const types = pkmnData.types.map(t => `"${t.type.name}"`);
          const evolvesTo = getEvolvesTo(evoData.chain, pkmnData.name) || [];

         
          txt +=
            `"${pkmnData.id}": {"name":"${pkmnData.name}",` +
            `"types": [${types}],` +
            `"evolves_to": [${evolvesTo.map(evo => evo.id).join(',')}],` +
            `"min_level": ${evolvesTo[0]?.minLevel || null},` +
            `"capture_rate": ${speciesData.capture_rate},` +
            `"is_legendary": ${speciesData.is_legendary},` +
            `"height": ${pkmnData.height}` +
            `},`;

          console.log(`Fetched data for Pokémon ID ${i}`);
        } catch (error) {
          console.error(`Error fetching data for Pokémon ID ${i}:`, error);
        }
      })()
    );
  }

  await Promise.all(fetchPromises);
  txt = txt.slice(0, -1);
  txt += '}';
  console.log(txt);

 
  try {
    const pkmnData = JSON.parse(txt);
    console.log('Parsed Pokémon Data:', pkmnData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};

fetchApi();
