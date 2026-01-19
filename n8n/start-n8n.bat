@echo off
echo ========================================
echo  SENTINEL Tecnologia - Iniciando N8N
echo ========================================
echo.
echo Iniciando N8N em http://localhost:5678
echo.
echo Aguarde a inicializacao...
echo.

set N8N_BASIC_AUTH_ACTIVE=true
set N8N_BASIC_AUTH_USER=sentinel
set N8N_BASIC_AUTH_PASSWORD=SentinelTec2026!
set N8N_HOST=localhost
set N8N_PORT=5678
set N8N_PROTOCOL=http
set WEBHOOK_URL=http://localhost:5678/
set N8N_ENCRYPTION_KEY=sentinel-automation-key-2026

n8n start

pause
