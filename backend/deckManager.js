// deckManager.js

class DeckManager {
    constructor() {
        this.baseDeck = [];
        this.drawPile = [];
        this.hand = [];
        this.discardPile = [];
        this.cardCounter = 1;
    }

    // Cria o deck padrão no início da run
    createStarterDeck() {
        this.baseDeck = [];
        for (let i = 0; i < 5; i++) {
            this.baseDeck.push({
                id: `attack_${this.cardCounter++}`, name: 'Strike', type: 'Ataque', cost: 1, value: 6, description: 'Causa 6 de dano.'
            });
        }
        for (let i = 0; i < 5; i++) {
            this.baseDeck.push({
                id: `defense_${this.cardCounter++}`, name: 'Defend', type: 'Defesa', cost: 1, value: 5, description: 'Ganha 5 de bloqueio.'
            });
        }
    }

    // Inicializa as pilhas para uma nova batalha clonando o baseDeck
    initializeDeck() {
        if (this.baseDeck.length === 0) {
            this.createStarterDeck();
        }
        this.drawPile = this.shuffle([...this.baseDeck]);
        this.hand = [];
        this.discardPile = [];
    }

    // Adiciona carta escolhida ao deck base
    addCardToBaseDeck(card) {
        this.baseDeck.push({ ...card, id: `loot_${this.cardCounter++}` });
    }

    // Gera opções de saque aleatórias
    generateLoot(amount = 3) {
        const cardPool = [
            { name: 'Cleave', type: 'Ataque', cost: 1, value: 8, description: 'Causa 8 de dano a todos. (Neste protótipo, causa 8 ao alvo único)' },
            { name: 'Iron Wave', type: 'Ataque', cost: 1, value: 5, block: 5, description: 'Ganha 5 de bloqueio. Causa 5 de dano.' }, // Efeito híbrido precisaria de suporte na engine, mas funciona o dano
            { name: 'Pommel Strike', type: 'Ataque', cost: 1, value: 9, draw: 1, description: 'Causa 9 de dano. Compra 1 carta.' },
            { name: 'Shrug It Off', type: 'Defesa', cost: 1, value: 8, draw: 1, description: 'Ganha 8 de bloqueio. Compra 1 carta.' },
            { name: 'Heavy Blade', type: 'Ataque', cost: 2, value: 14, description: 'Causa 14 de dano.' },
            { name: 'Flame Barrier', type: 'Defesa', cost: 2, value: 12, description: 'Ganha 12 de bloqueio.' }
        ];

        const loot = [];
        for (let i = 0; i < amount; i++) {
            const randomIndex = Math.floor(Math.random() * cardPool.length);
            loot.push(cardPool[randomIndex]);
        }
        return loot;
    }

    // Embaralhamento seguro usando o algoritmo Fisher-Yates
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Compra 1 carta do deck e coloca na mão
    drawCard() {
        if (this.drawPile.length === 0) {
            // Se acabar o Draw Pile, reembaralha o Descarte de volta
            if (this.discardPile.length === 0) return; // Nenhuma carta disponível
            
            this.drawPile = this.shuffle(this.discardPile);
            this.discardPile = [];
        }

        const card = this.drawPile.pop();
        if (card) {
            this.hand.push(card);
        }
    }

    // Compra um número inicial de cartas para a mão
    drawHand(amount = 5) {
        for (let i = 0; i < amount; i++) {
            this.drawCard();
        }
    }

    // Move uma carta da mão para o descarte (quando o jogador usar a carta)
    discardCard(cardId) {
        const index = this.hand.findIndex(c => c.id === cardId);
        if (index !== -1) {
            const [card] = this.hand.splice(index, 1);
            this.discardPile.push(card);
            return true;
        }
        return false;
    }

    // Move toda a mão para o descarte (no fim do turno)
    discardHand() {
        this.discardPile.push(...this.hand);
        this.hand = [];
    }

    // Retorna o estado seguro do deck para o frontend
    // Note que não enviamos o conteúdo do drawPile e discardPile, apenas as contagens
    getDeckState() {
        return {
            drawPileCount: this.drawPile.length,
            discardPileCount: this.discardPile.length,
            hand: this.hand
        };
    }
}

// Exporta como um singleton
const deckManagerInstance = new DeckManager();
module.exports = deckManagerInstance;
