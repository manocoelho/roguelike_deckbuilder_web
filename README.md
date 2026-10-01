# 🃏 Slay the Spire Clone - Edição JRPG 16-bits

Um protótipo completo de jogo de cartas roguelike inspirado em "Slay the Spire", reimaginado com uma charmosa estética retro de JRPGs 16-bits (estilo Chrono Trigger, Pokémon Emerald e Final Fantasy). 

O projeto conta com arquitetura modular, sistema de combate em turnos e integração clara entre Frontend (vanilla) e Backend (Node.js).

## 🚀 Como Jogar (Instalação Rápida)

Para jogadores e desenvolvedores em ambiente Windows:
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.
2. Dê um duplo-clique no arquivo `instalar_e_jogar.bat` na raiz do projeto.
3. O script instalará as dependências automaticamente e iniciará o servidor backend.
4. Sem fechar a janela do terminal, abra o arquivo `frontend/index.html` em seu navegador favorito (Chrome, Edge, Firefox, etc.).

---

## 🛠️ Instalação Manual

Caso prefira rodar os comandos manualmente ou esteja em outro Sistema Operacional (Linux/Mac):

1. **Backend**:
   Abra um terminal na pasta `backend/`.
   ```bash
   npm install
   npm start
   ```
   O servidor será iniciado na porta `3000`.

2. **Frontend**:
   Basta abrir o arquivo `/frontend/index.html` em qualquer navegador moderno. O Frontend fará chamadas `fetch` para o seu localhost no backend.

---

## 🔮 Funcionalidades (Features Atuais)
* **Combate em Turnos**: Sistema robusto de intenção do inimigo (Ataque, Defesa) gerenciado como 'Source of Truth' pelo backend.
* **Baralho e Descarte (Deck Manager)**: Compra de cartas limitadas por turno e sistema de embaralhamento dinâmico do descarte.
* **Sistema de Mana e HP**: Motor de mitigação de dano com uso de Armadura/Bloqueio (`Block`) antes da barra de Vida.
* **Saques de Batalha (Loot)**: Ao final do combate, um rascunho (Draft) com 3 cartas geradas proceduralmente permite expandir seu baralho.
* **Mochila de Poções (Potion Belt)**: Poções de uso único consumíveis livremente para restaurar Vida (Cura) ou aumentar Dano base (Força).
* **Partículas em CSS**: Interface visual animada e polida contendo chuvas de folhas e transições nostálgicas.

## 🏗️ Arquitetura e Tecnologias
O projeto segue uma rigorosa separação de responsabilidades (SRP).
* **Frontend**: `HTML5`, `CSS3` nativo e `Vanilla JavaScript` (`uiManager.js` para manipulação de DOM e visual, `apiClient.js` para requests REST, e `vfxManager.js` para partículas de tela).
* **Backend**: `Node.js` com framework `Express` servindo endpoints RESTful para garantir que a lógica e a pontuação do jogo fiquem isoladas do navegador (`gameState.js`, `combatEngine.js`, `deckManager.js`, `potionService.js`).
* **Imagens**: Sprites originais renderizados para a tela utilizando métodos pixel-perfect (`image-rendering: auto` em alta resolução sem ghost-text).

---
*Divirta-se desbravando a masmorra e descobrindo combos devastadores!*
