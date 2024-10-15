const getPokemons = async (limit = 5) => { 
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      
      
      const json = await response.json();
      return json.results.map(pokemon => pokemon.name);
  } catch (error) {
      console.error("Error fetching pokemons:", error.message);
      return [];
  }
}

export default getPokemons;