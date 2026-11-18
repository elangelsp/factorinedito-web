@echo off
rem Sube los commits de main a GitHub; Cloudflare Workers Builds despliega la web automaticamente.
cd /d "%~dp0"
git push origin main
echo.
if errorlevel 1 (echo ERROR: el push no se ha completado.) else (echo Push completado. Cloudflare desplegara la web en un par de minutos.)
pause
