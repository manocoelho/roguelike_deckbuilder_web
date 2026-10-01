const express = require('express');
const cors = require('cors');
const gameState = require('./gameState');
const combatEngine = require('./combatEngine');

const app = express();

// Middleware
app.use(cors()); // Permite que o frontend faça requisições para este backend
app.use(express.json());

// Rota para iniciar uma nova batalha
app.post('/api/battle/start', (req, res) => {
    gameState.startBattle();
    res.json({ 
        message: 'Batalha iniciada com sucesso!', 
        state: gameState.getState() 
    });
});

// Rota para jogar uma carta
app.post('/api/battle/play-card', (req, res) => {
    try {
        const { cardId } = req.body;
        if (!cardId) return res.status(400).json({ error: "O campo 'cardId' é obrigatório." });
const potionService = require('./potionService');
app.post('/api/battle/use-potion', (req, res) => {
    try {
        const { index } = req.body;
        const result = potionService.usePotion(index);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
        
        const result = combatEngine.playCard(cardId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para encerrar o turno
app.post('/api/battle/end-turn', (req, res) => {
    try {
        const result = combatEngine.endTurn();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para escolher uma carta do saque
app.post('/api/battle/choose-loot', (req, res) => {
    try {
        const { card } = req.body;
        // Importando deckManager diretamente aqui apenas para esta rota simples
        const deckManager = require('./deckManager');
        if (card) {
            deckManager.addCardToBaseDeck(card);
        }
        
        gameState.nextBattle();

        res.json({ 
            message: 'A próxima batalha começou!', 
            state: gameState.getState() 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para consultar o estado atual da batalha
app.get('/api/battle/state', (req, res) => {
    if (!gameState.isActive) {
        return res.status(400).json({ error: 'Nenhuma batalha ativa no momento.' });
    }
    res.json(gameState.getState());
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de jogo rodando na porta ${PORT}`);
});

