#!/usr/bin/env node
import getPokemons from './pokemons.js';
import getUserPokemon from './playerPokemon.js';
import inquirer from 'inquirer';
import { getRandomItem, attack } from './utils.js';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

async function playPokemonGame() {
    console.log("------------------ POKEMON GAME ------------------");
   

    const pokemons = await getPokemons();
    const botPokemonName = getRandomItem(pokemons);

    const { pokemon: playerPokemonName } = await inquirer.prompt([
        {
            name: "pokemon",
            type: "list",
            message: "Choose your Pokemon:",
            choices: pokemons
        }
    ]);

    console.log(`You are playing against ${botPokemonName}`);

    const playerPokemon = await getUserPokemon(playerPokemonName);
    const botPokemon = await getUserPokemon(botPokemonName);

    playerPokemon.hp = 300;
    botPokemon.hp = 300;

    while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
        const { move: playerMoveChoice } = await inquirer.prompt([
            {
                name: "move",
                type: "list",
                message: "Choose your move:",
                choices: playerPokemon.moves.map(move => `${move.name} (Power: ${move.power}, Accuracy: ${move.accuracy}, PP: ${move.pp})`)
            }
        ]);

        const playerMove = playerPokemon.moves.find(move => playerMoveChoice.startsWith(move.name));
        const botMove = getRandomItem(botPokemon.moves);

        console.log(`${botPokemon.name} chooses ${botMove.name}`);

        
        attack(playerPokemon, botPokemon, playerMove, botMove);
        if (botPokemon.hp <= 0) break;

        
        attack(botPokemon, playerPokemon, botMove, playerMove);
        if (playerPokemon.hp <= 0) break;
    }

    if (playerPokemon.hp <= 0) {
        console.log(RED + `${playerPokemon.name} fainted. You lose!` + RESET);

    } else {
        console.log(GREEN + `${botPokemon.name} fainted. You win!` + RESET);
    }
}

playPokemonGame();