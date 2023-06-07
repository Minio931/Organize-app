Start-Process PowerShell -ArgumentList '-noexit', 'node ./organize-app-backend/index.js';
Start-Process PowerShell -ArgumentList '-noexit', 'cd ./organize-app-frontend; npm start';
Start-Sleep -Seconds 10
cd ./organize-app-frontend; npm run electron-dev