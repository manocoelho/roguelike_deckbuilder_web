// apiClient.js
const API_BASE = 'http://localhost:3000/api/battle';

const apiClient = {
    async startBattle() {
        const response = await fetch(`${API_BASE}/start`, { method: 'POST' });
        return response.json();
    },
    
    async playCard(cardId) {
        const response = await fetch(`${API_BASE}/play-card`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardId })
        });
        return response.json();
    },

    async endTurn() {
        const response = await fetch(`${API_BASE}/end-turn`, { method: 'POST' });
        return response.json();
    },

    async chooseLoot(card) {
        const response = await fetch(`${API_BASE}/choose-loot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ card })
        });
        return response.json();
    },

    async getState() {
        const response = await fetch(`${API_BASE}/state`);
        return response.json();
    }
};

