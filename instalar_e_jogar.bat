@echo off
echo ===================================================
echo  Slay the Spire Clone (JRPG 16-bits) - Instalador
echo ===================================================
echo.

echo Verificando instalacao do Node.js...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado no sistema!
    echo Por favor, faca o download e instale o Node.js acessando: https://nodejs.org/
    echo Apos a instalacao, feche este terminal e execute o arquivo novamente.
    pause
    exit /b
)
echo Node.js encontrado!
echo.

echo Acessando a pasta do backend...
cd backend

echo Instalando as dependencias necessarias (Express, CORS)...
call npm install

echo.
echo ===================================================
echo  Instalacao concluida com sucesso!
echo ===================================================
echo.
echo Iniciando o Servidor do Jogo...
echo.
echo Para jogar, abra o seguinte arquivo no seu navegador:
echo %~dp0frontend\index.html
echo.
echo [ATENCAO] Nao feche esta janela, ela mantem o backend rodando!
echo Pressione Ctrl+C para desligar o servidor quando terminar de jogar.
echo.

npm start
