// main.js

window.playCardHandler = async function(cardId) {
    try {
        const response = await apiClient.playCard(cardId);
        if (response.error) { console.warn(response.error); return; }

        uiManager.updateState(response.state);

        if (response.victory) {
            setTimeout(() => {
                uiManager.showLootScreen(response.loot);
            }, 600);
        } else if (response.gameOver) {
            setTimeout(() => {
                uiManager.showEndScreen(false, response.message);
            }, 600);
        }
    } catch (e) {
        console.error("Erro ao jogar carta: ", e);
    }
};

window.usePotionHandler = async function(index) {
    try {
        const response = await apiClient.usePotion(index);
        if (response.error) { console.warn(response.error); return; }
        uiManager.updateState(response.state);
    } catch (e) {
        console.error("Erro ao usar poção: ", e);
    }
};

window.endTurnHandler = async function() {
    try {
        const response = await apiClient.endTurn();
        if (response.error) { console.warn(response.error); return; }

        uiManager.updateState(response.state);

        if (response.gameOver) {
            setTimeout(() => {
                uiManager.showEndScreen(false, response.message);
            }, 600);
        }
    } catch (e) {
        console.error("Erro ao encerrar turno: ", e);
    }
};

window.chooseLootHandler = async function(card) {
    try {
        const response = await apiClient.chooseLoot(card);
        if (response.error) { console.warn(response.error); return; }
        
        uiManager.updateState(response.state);
        uiManager.showBattleScreen();
    } catch (e) {
        console.error("Erro ao escolher saque: ", e);
    }
};

window.startNewRun = async function() {
    try {
        const response = await apiClient.startBattle();
        uiManager.updateState(response.state);
        uiManager.showBattleScreen();
    } catch (e) {
        console.error("Falha ao se comunicar com o backend.", e);
        alert("Falha ao iniciar. O backend está rodando?");
    }
};

// Vinculando eventos
document.getElementById('end-turn-btn').onclick = window.endTurnHandler;
document.getElementById('new-run-btn').onclick = window.startNewRun;
document.getElementById('return-start-btn').onclick = () => uiManager.showStartScreen();
document.getElementById('skip-loot-btn').onclick = () => window.chooseLootHandler(null);

// Ao abrir o jogo, mostra a tela inicial
uiManager.showStartScreen();

