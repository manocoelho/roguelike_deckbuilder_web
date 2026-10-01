// combatEngine.js
const gameState = require('./gameState');
const deckManager = require('./deckManager');

class CombatEngine {
    
    // Função para o jogador jogar uma carta
    playCard(cardId) {
        if (!gameState.isActive) {
            throw new Error("A batalha não está ativa.");
        }

        const player = gameState.player;
        const enemy = gameState.enemy;
        
        // Verifica se a carta está na mão
        const cardIndex = deckManager.hand.findIndex(c => c.id === cardId);
        if (cardIndex === -1) {
            throw new Error("Carta não encontrada na mão.");
        }
        
        const card = deckManager.hand[cardIndex];

        // Verifica energia
        if (player.currentEnergy < card.cost) {
            throw new Error("Energia insuficiente para jogar esta carta.");
        }

        // Deduz energia e move a carta da mão para o descarte
        player.currentEnergy -= card.cost;
        deckManager.discardCard(cardId);

        // Aplica os efeitos da carta
        if (card.type === 'Ataque') {
            let damage = card.value + (player.buffs && player.buffs.strength ? player.buffs.strength : 0);
            if (enemy.block > 0) {
                if (enemy.block >= damage) { enemy.block -= damage; damage = 0; } 
                else { damage -= enemy.block; enemy.block = 0; }
            }
            enemy.currentHp -= damage;
            if (enemy.currentHp < 0) enemy.currentHp = 0;
        } else if (card.type === 'Defesa') {
            player.block += card.value;
        }

        // Suporte a efeitos extras das cartas de loot
        if (card.block) player.block += card.block;
        if (card.draw) deckManager.drawHand(card.draw);

        // Verifica condição de vitória
        if (enemy.currentHp <= 0) {
            gameState.isActive = false;
            const lootCards = deckManager.generateLoot(3);
            return { victory: true, gameOver: false, loot: lootCards, message: "Você derrotou o inimigo! Escolha sua recompensa.", state: gameState.getState() };
        }

        return { victory: false, gameOver: false, message: `Você jogou ${card.name}.`, state: gameState.getState() };
    }

    // Função para encerrar o turno do jogador e executar a ação do inimigo
    endTurn() {
        if (!gameState.isActive) {
            throw new Error("A batalha não está ativa.");
        }

        const player = gameState.player;
        const enemy = gameState.enemy;

        // --- 1. Fim do Turno do Jogador ---
        // Descarta as cartas que sobraram na mão
        deckManager.discardHand();

        // --- 2. Turno do Inimigo ---
        // Executa a intenção (no nosso caso, o ataque fixo simulado na string 'Attack X')
        const intentParts = enemy.intent.split(' ');
        const intentAction = intentParts[0];
        const intentValue = parseInt(intentParts[1]) || 0;

        if (intentAction === 'Attack') {
            let damage = intentValue;

            // Bloqueio do jogador mitiga o dano
            if (player.block >= damage) {
                player.block -= damage;
                damage = 0;
            } else {
                damage -= player.block;
                player.block = 0;
            }

            // Dano restante reduz a vida
            player.currentHp -= damage;
            if (player.currentHp < 0) player.currentHp = 0;
        }

        // Verifica condição de derrota (Jogador HP <= 0)
        if (player.currentHp <= 0) {
            gameState.isActive = false;
            return { gameOver: true, message: "Você foi derrotado. Game Over.", state: gameState.getState() };
        }

        // --- 3. Início do Novo Turno ---
        // Zera o bloqueio residual do jogador e do inimigo (já que não acumulam de um turno pro outro)
        player.block = 0;
        enemy.block = 0;

        // Restaura energia e compra a nova mão
        player.currentEnergy = player.maxEnergy;
        deckManager.drawHand(5);

        // Gera uma nova intenção pro inimigo pra dar dinâmica (alternando entre 8 e 12 de dano aleatório)
        const novoDano = Math.floor(Math.random() * 5) + 8; // Dano entre 8 e 12
        enemy.intent = `Attack ${novoDano}`;

        return { gameOver: false, message: "Novo turno iniciado.", state: gameState.getState() };
    }
}

const combatEngineInstance = new CombatEngine();
module.exports = combatEngineInstance;

