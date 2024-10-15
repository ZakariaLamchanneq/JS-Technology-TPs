async function getPokemonMoves(pokemonData) {
  const moves = [];
  for (const moveEntry of pokemonData.moves.slice(0, 5)) {
      try {
          const moveResponse = await fetch(moveEntry.move.url);
          
          const moveData = await moveResponse.json();
          moves.push({
              name: moveData.name,
              power: moveData.power || 0,
              accuracy: moveData.accuracy || 100,
              pp: moveData.pp || 0
          });
      } catch (error) {
          console.error(`Error fetching move data `, error.message);
      }
  }
  return moves;
}

const getUserPokemon = async (pokemon) => {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      const userPokemon = {
          name: json.name,
          id: json.id,
          moves: await getPokemonMoves(json),
      };
      
      return userPokemon;
  } catch (error) {
      console.error("Error fetching user pokemon:", error.message);
      return null;
  }
}

export default getUserPokemon;