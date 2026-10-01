const gameState = require('./gameState');

class PotionService {
    usePotion(index) {
        if (!gameState.isActive) throw new Error("A batalha no est ativa.");
        
        const player = gameState.player;
        if (!player.potions || index < 0 || index >= player.potions.length) {
            throw new Error("Poo invlida.");
        }

        const potion = player.potions[index];
        if (!potion) throw new Error("Slot de poo vazio.");

        // Aplica o efeito
        if (potion === 'Poção de Cura') {
            player.currentHp += 20;
            if (player.currentHp > player.maxHp) player.currentHp = player.maxHp;
        } else if (potion === 'Poção de Força') {
            if (!player.buffs) player.buffs = { strength: 0 };
            player.buffs.strength += 2;
        }

        // Remove a poo do slot (mantemos o array do mesmo tamanho, substituindo por null, ou deletamos do array?)
        // Se deletarmos, o array encolhe. O Slay the Spire tem slots fixos. Ento vamos deixar null no lugar.
        player.potions[index] = null;
        
        return { message: `Usou ${potion}.`, state: gameState.getState() };
    }
}

module.exports = new PotionService();
