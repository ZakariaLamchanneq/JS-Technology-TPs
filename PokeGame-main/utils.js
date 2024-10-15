export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}



export function attack(attacker, defender, attackerMove, defenderMove) {
    if (attackerMove.pp <= 0) {
        console.log(`${attacker.name}'s ${attackerMove.name} has no PP left!`);
        return;
    }

    if (attackerMove.pp < defenderMove.pp) {
        console.log(`${attacker.name}'s ${attackerMove.name} has lower PP than ${defender.name}'s ${defenderMove.name}. Attack doesn't take place!`);
        return;
    }

    attackerMove.pp--;

    if (Math.random() * 100 > attackerMove.accuracy) {
        console.log(`${attacker.name}'s ${attackerMove.name} missed :()`);
        return;
    }

    const damage = attackerMove.power;
    defender.hp -= damage;
    console.log(`${attacker.name} used ${attackerMove.name} and dealt ${damage} damage to ${defender.name}!`);
    console.log(`${defender.name}'s HP: ${defender.hp}`);
}