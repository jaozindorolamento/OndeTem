@echo off
cd /d "%~dp0"
if not exist node_modules npm install
if not exist ..\database\data\ondetem.db npm run db:init
npm start
pause
