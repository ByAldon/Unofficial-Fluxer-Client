const { app, BrowserWindow, Tray, Menu, session } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;
let isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    title: "Unofficial Fluxer Client", // De nieuwe naam
    titleBarStyle: 'hiddenInset', 
    backgroundColor: '#1e1e1e',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('https://web.fluxer.app/channels/@me');
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function createTray() {
  const iconPath = path.join(__dirname, 'icon.png');
  tray = new Tray(iconPath);
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Unofficial Fluxer', click: () => mainWindow.show() },
    { 
      label: 'Clear Cache & Reload', 
      click: async () => { 
        await session.defaultSession.clearCache(); 
        mainWindow.reload(); 
      } 
    },
    { type: 'separator' },
    { label: 'Quit', click: () => {
        isQuitting = true;
        app.quit();
      } 
    }
  ]);

  tray.setToolTip('Unofficial Fluxer Client');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => mainWindow.show());
}

app.whenReady().then(() => {
  createWindow();
  try { createTray(); } catch (e) { console.log("Tray failed"); }
});

app.on('window-all-closed', (e) => {
  if (process.platform !== 'darwin') { }
});