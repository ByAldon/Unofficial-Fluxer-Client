const { app, BrowserWindow, Tray, Menu, session, dialog, net, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;
let refreshInterval = null; // Variabele voor de Smart Refresh timer

const currentVersion = '1.4.4'; 
const appName = "Unofficial Fluxer Client";

function performHardRefresh() {
  if (mainWindow) {
    session.defaultSession.clearCache().then(() => {
      console.log('Hard refresh triggered.');
      mainWindow.reload();
    });
  }
}

ipcMain.on('hard-refresh', () => { performHardRefresh(); });

// Start de 5-minuten timer
function startSmartRefresh() {
  if (!refreshInterval) {
    console.log('App minimized/hidden. Smart refresh timer started (5 min).');
    refreshInterval = setInterval(() => {
      if (mainWindow) {
        console.log('Executing smart background refresh.');
        mainWindow.webContents.reloadIgnoringCache();
      }
    }, 300000); // 300.000 ms = 5 minuten
  }
}

// Stop de timer direct
function stopSmartRefresh() {
  if (refreshInterval) {
    console.log('App active. Smart refresh timer stopped.');
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440, height: 900, title: appName,
    icon: path.join(__dirname, 'icon.png'), backgroundColor: '#1e1e1e',
    autoHideMenuBar: true, 
    webPreferences: {
      nodeIntegration: false, contextIsolation: true, sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.removeMenu();
  
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault();
    mainWindow.setTitle(appName); 
  });

  // 1. Onderschep normale navigatie (klikken in hetzelfde venster)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.fluxer.app' && parsedUrl.hostname !== 'fluxer.app') {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // 2. Onderschep chat-links en pop-ups (target="_blank")
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.fluxer.app' && parsedUrl.hostname !== 'fluxer.app') {
      shell.openExternal(url);
      return { action: 'deny' }; // Voorkom dat Electron een leeg scherm opent
    }
    return { action: 'allow' };
  });

  session.defaultSession.clearCache().then(() => {
    mainWindow.loadURL('https://web.fluxer.app/');
  });

  // Koppel de Smart Refresh aan de venster-statussen
  mainWindow.on('minimize', startSmartRefresh);
  mainWindow.on('hide', startSmartRefresh);
  mainWindow.on('restore', stopSmartRefresh);
  mainWindow.on('show', stopSmartRefresh);

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function checkUpdates(manual = false) {
  const request = net.request('https://api.github.com/repos/ByAldon/Unofficial-Fluxer-Client/releases/latest');
  request.on('response', (response) => {
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => {
      try {
        const data = JSON.parse(body);
        const latestVersion = data.tag_name.replace('v', '');
        if (latestVersion !== currentVersion) {
          // Stille pop-up met directe download knop
          dialog.showMessageBox({
            type: 'none', 
            title: 'Update Available',
            message: `A new version (${latestVersion}) is available!`,
            buttons: ['Download Update', 'Later'],
            noLink: true
          }).then((result) => {
            if (result.response === 0) {
              // Open de nieuwste release pagina op GitHub
              shell.openExternal('https://github.com/ByAldon/Unofficial-Fluxer-Client/releases/latest');
            }
          });
        } else if (manual) {
          dialog.showMessageBox({
            type: 'none', 
            title: 'Up to Date',
            message: 'You are running the latest version.',
            buttons: ['OK']
          });
        }
      } catch (e) {
        if (manual) dialog.showErrorBox('Error', 'Could not check for updates.');
      }
    });
  });
  request.end();
}

app.whenReady().then(() => {
  createWindow();
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Clear Cache & Reload', click: () => performHardRefresh() },
    { type: 'separator' },
    {
      label: 'About',
      click: () => {
        const options = {
          type: 'none', title: `About ${appName}`, message: appName, 
          detail: `Version: ${currentVersion}\nAuthor: Aldon`,
          buttons: ['Check for Updates', 'GitHub', 'Close'],
          noLink: true
        };
        dialog.showMessageBox(mainWindow, options).then((result) => {
          if (result.response === 0) checkUpdates(true);
          else if (result.response === 1) shell.openExternal('https://github.com/ByAldon/Unofficial-Fluxer-Client');
        });
      }
    },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  tray.setToolTip(appName);
  tray.setContextMenu(contextMenu);

  setTimeout(() => checkUpdates(false), 3000);
});