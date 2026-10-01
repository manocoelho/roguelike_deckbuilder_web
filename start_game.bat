@echo off
title Iniciador do Jogo

echo =========================================
echo   INICIANDO O JOGO (BACKEND E FRONTEND)
echo =========================================
echo.

echo [1/2] Iniciando o servidor backend...
:: Abre uma nova janela do terminal (cmd) dedicada para rodar o backend
start "Backend - Jogo de Cartas" cmd /k "cd backend && npm start"

echo.
echo Aguardando 2 segundos para garantir que o servidor ligou...
timeout /t 2 /nobreak > nul

echo.
echo [2/2] Abrindo o frontend no navegador...
:: O comando 'start' abrira o arquivo index.html no seu navegador padrao
start frontend\index.html

echo.
echo Jogo aberto! Voce ja pode fechar esta janela principal.
echo (A outra janela do servidor backend ficara aberta rodando o jogo. Feche-a quando parar de jogar).
exit
