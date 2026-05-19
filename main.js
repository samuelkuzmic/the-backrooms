const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: false, 
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

// MATCHING SIGNAL: listens for 'quit-app' from index.html
ipcMain.on('quit-app', () => {
  app.quit();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
