const assetsMapping = {
    default_player: './assets/images/player_idle.png',
    default_enemy: './assets/images/enemy_idle.png'
};

const uiManager = {
    // --- GERENCIAMENTO DE TELAS ---
    showScreen(screenId) {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('battle-screen').style.display = 'none';
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById('loot-screen').style.display = 'none';
        
        if (screenId === 'battle-screen') {
            document.getElementById(screenId).style.display = 'flex';
        } else {
            document.getElementById(screenId).style.display = 'flex';
        }
    },

    showStartScreen() { 
        this.showScreen('start-screen'); 
        
        const highScore = localStorage.getItem('slay_clone_max_floor') || 0;
        const displayEl = document.getElementById('high-score-display');
        if (highScore > 0) {
            displayEl.innerText = `🏆 Recorde de Andares: ${highScore}`;
        } else {
            displayEl.innerText = '';
        }
    },
    
    showBattleScreen() { this.showScreen('battle-screen'); },

    // --- RENDERIZADOR DE CARTAS ---
    renderCard(cardEl, card) {
        if (card.name === 'Strike' || card.name === 'Defend') {
            const imgName = card.name === 'Strike' ? 'card_strike.png' : 'card_defend.png';
            cardEl.style.backgroundImage = `url('./assets/images/${imgName}')`;
            cardEl.style.backgroundSize = 'contain';
            cardEl.style.backgroundRepeat = 'no-repeat';
            cardEl.style.backgroundPosition = 'center';
            cardEl.style.border = 'none';
            cardEl.style.backgroundColor = '#fff';
            cardEl.style.boxShadow = 'none';
            cardEl.classList.add('image-card');
            
            // Usa apenas a arte limpa da carta
            cardEl.innerHTML = '';
        } else {
            cardEl.innerHTML = `
                <div class="card-cost">${card.cost}</div>
                <div class="card-name">${card.name}</div>
                <div class="card-image-placeholder"></div>
                <div class="card-desc">${card.description}</div>
            `;
        }
    },

    showLootScreen(lootCards) {
        this.showScreen('loot-screen');
        
        const container = document.getElementById('loot-cards-container');
        container.innerHTML = '';

        lootCards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = `card ${card.type === 'Ataque' ? 'attack' : 'defense'}`;
            cardEl.onclick = () => window.chooseLootHandler(card);
            
            this.renderCard(cardEl, card);
            
            container.appendChild(cardEl);
        });
    },

    showEndScreen(isVictory, message) {
        this.showScreen('end-screen');
        const title = document.getElementById('end-title');
        const msgEl = document.getElementById('end-message');

        if (isVictory) {
            title.innerText = 'VITÓRIA!';
            title.style.color = '#2ecc71';
        } else {
            title.innerText = 'GAME OVER';
            title.style.color = '#e74c3c';
        }
        
        msgEl.innerText = message;
    },

    // --- SPRITES DINÂMICOS ---
    updateEntitySprites(enemyId) {
        const playerEl = document.getElementById('player-sprite');
        const enemyEl = document.getElementById('enemy-sprite');
        
        if (playerEl) {
            playerEl.style.backgroundImage = `url('${assetsMapping.default_player}')`;
        }
        if (enemyEl) {
            const enemyPath = assetsMapping[enemyId] || assetsMapping.default_enemy;
            enemyEl.style.backgroundImage = `url('${enemyPath}')`;
        }
    },

    // --- ATUALIZAÇÃO DO ESTADO ---
    updateState(gameState) {
        if (!gameState) return;

        if (gameState.floor) {
            document.getElementById('floor-display').innerText = `Andar ${gameState.floor}`;
            
            const currentHigh = parseInt(localStorage.getItem('slay_clone_max_floor') || '0');
            if (gameState.floor > currentHigh) {
                localStorage.setItem('slay_clone_max_floor', gameState.floor);
            }
        }
        
        this.updatePlayer(gameState.player);
        this.updateEnemy(gameState.enemy);
        this.updateDeck(gameState.deck);

        // Injeta a arte PNG dinamicamente
        const currentEnemyId = (gameState.enemy && gameState.enemy.id) ? gameState.enemy.id : 'default_enemy';
        this.updateEntitySprites(currentEnemyId);
    },

    updatePlayer(player) {
        if (!player) return;

        document.getElementById('player-hp-text').innerText = `${player.currentHp}/${player.maxHp}`;
        const hpPercent = (player.currentHp / player.maxHp) * 100;
        document.getElementById('player-hp-bar').style.width = `${hpPercent}%`;

        document.getElementById('energy-text').innerText = `${player.currentEnergy}/${player.maxEnergy}`;

        const blockBubble = document.getElementById('player-block');
        if (player.block > 0) {
            blockBubble.style.display = 'inline-block';
            document.getElementById('player-block-val').innerText = player.block;
        } else {
            blockBubble.style.display = 'none';
        }

        // Atualiza Poções
        const potionBelt = document.getElementById('potion-belt');
        if (potionBelt && player.potions) {
            potionBelt.innerHTML = '';
            player.potions.forEach((potion, index) => {
                const slot = document.createElement('div');
                slot.className = 'potion-slot';
                
                if (potion) {
                    const icon = document.createElement('div');
                    icon.className = 'potion-icon';
                    icon.innerHTML = potion.includes('Cura') ? '❤️' : '💪';
                    
                    const tooltip = document.createElement('div');
                    tooltip.className = 'potion-tooltip';
                    tooltip.innerText = potion;
                    
                    slot.appendChild(icon);
                    slot.appendChild(tooltip);
                    slot.onclick = () => window.usePotionHandler(index);
                }
                
                potionBelt.appendChild(slot);
            });
        }
    },

    updateEnemy(enemy) {
        if (!enemy) return;

        document.getElementById('enemy-hp-text').innerText = `${enemy.currentHp}/${enemy.maxHp}`;
        const hpPercent = (enemy.currentHp / enemy.maxHp) * 100;
        document.getElementById('enemy-hp-bar').style.width = `${hpPercent}%`;

        const intentDamage = enemy.intent.split(' ')[1];
        document.getElementById('enemy-intent').innerText = `⚔️ ${intentDamage || 0}`;

        const blockBubble = document.getElementById('enemy-block');
        if (enemy.block > 0) {
            blockBubble.style.display = 'inline-block';
            document.getElementById('enemy-block-val').innerText = enemy.block;
        } else {
            blockBubble.style.display = 'none';
        }
    },

    updateDeck(deck) {
        if (!deck) return;

        document.getElementById('draw-count').innerText = deck.drawPileCount;
        document.getElementById('discard-count').innerText = deck.discardPileCount;

        const handContainer = document.getElementById('hand-container');
        handContainer.innerHTML = ''; 

        deck.hand.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = `card ${card.type === 'Ataque' ? 'attack' : 'defense'}`;
            cardEl.onclick = () => window.playCardHandler(card.id);

            this.renderCard(cardEl, card);
            
            handContainer.appendChild(cardEl);
        });
    }
};

