// gameState.js

const deckManager = require('./deckManager');

class GameState {
    constructor() {
        this.player = null;
        this.enemy = null;
        this.isActive = false;
    }

    startBattle() {
        // Nova run reseta tudo
        this.floor = 1;
        this.player = { 
            maxHp: 80, currentHp: 80, 
            maxEnergy: 3, currentEnergy: 3, 
            block: 0,
            potions: ['Poção de Cura', 'Poção de Força', null], // Slots max 3
            buffs: { strength: 0 }
        };
        this.enemy = { maxHp: 50, currentHp: 50, block: 0, intent: 'Attack 10' };

        deckManager.createStarterDeck();
        deckManager.initializeDeck();
        deckManager.drawHand(5);

        this.isActive = true;
    }

    nextBattle() {
        // Avança de andar
        this.floor++;
        
        // Próxima batalha de uma run ativa (Mantém HP e BaseDeck)
        this.player.currentEnergy = this.player.maxEnergy;
        this.player.block = 0;

        // Inimigo fica um pouco mais forte (+20% de HP baseado no andar)
        const bonusHp = Math.floor(50 * Math.pow(1.2, this.floor - 1));
        this.enemy.maxHp = bonusHp;
        this.enemy.currentHp = bonusHp;
        this.enemy.block = 0;
        
        // Aumenta o dano do inimigo proporcionalmente
        const baseDano = 10 + (this.floor * 2);
        this.enemy.intent = `Attack ${baseDano}`;

        deckManager.initializeDeck(); // Pega o baseDeck atualizado
        deckManager.drawHand(5);

        this.isActive = true;
    }

    getState() {
        return {
            floor: this.floor,
            player: this.player,
            enemy: this.enemy,
            deck: deckManager.getDeckState(),
            isActive: this.isActive
        };
    }
}

// Exportando uma instância única (singleton) para armazenar o estado em memória no servidor
const gameStateInstance = new GameState();
module.exports = gameStateInstance;
