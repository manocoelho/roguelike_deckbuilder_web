// simulateTurn.js
const gameState = require('./gameState');
const deckManager = require('./deckManager');
const combatEngine = require('./combatEngine');

function printState(stepName) {
    console.log(`\n=== [ ${stepName} ] ===`);
    const state = gameState.getState();
    console.log(`JOGADOR: HP: ${state.player.currentHp}/${state.player.maxHp} | Energia: ${state.player.currentEnergy}/${state.player.maxEnergy} | Bloqueio: ${state.player.block}`);
    console.log(`INIMIGO: HP: ${state.enemy.currentHp}/${state.enemy.maxHp} | Intenção: ${state.enemy.intent} | Bloqueio: ${state.enemy.block}`);
    console.log(`DECK: Mão(${state.deck.hand.length}) | Compra(${state.deck.drawPileCount}) | Descarte(${state.deck.discardPileCount})`);
    
    const handNames = state.deck.hand.map(c => c.name).join(', ');
    console.log(`MÃO ATUAL: [ ${handNames} ]`);
}

// 1 e 2) Criação do combate e compra das 5 cartas iniciais
console.log("-> Iniciando a Batalha...");
gameState.startBattle();
printState("Estado Inicial (Após Compra)");

// 3) Simulando uso de cartas
const hand = deckManager.hand;
const attackCard = hand.find(c => c.type === 'Ataque');
const defenseCard = hand.find(c => c.type === 'Defesa');

if (attackCard) {
    console.log(`\n-> Jogador usou: ${attackCard.name} (Dano: ${attackCard.value}, Custo: ${attackCard.cost})`);
    combatEngine.playCard(attackCard.id);
} else {
    console.log("\n-> Curioso, não puxou nenhum ataque nesta mão inicial!");
}

if (defenseCard) {
    console.log(`\n-> Jogador usou: ${defenseCard.name} (Bloqueio: ${defenseCard.value}, Custo: ${defenseCard.cost})`);
    combatEngine.playCard(defenseCard.id);
} else {
    console.log("\n-> Curioso, não puxou nenhuma defesa nesta mão inicial!");
}

printState("Estado Após as Jogadas");

// 4) Encerramento do turno e ataque do inimigo
console.log("\n-> Jogador aperta 'Encerrar Turno'...");
combatEngine.endTurn();

printState("Novo Turno (Após Ataque Inimigo e Nova Compra)");
