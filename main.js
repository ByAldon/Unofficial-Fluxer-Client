const { app, BrowserWindow, Tray, Menu, session, dialog, net, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs'); // Toegevoegd om instellingen op te slaan

let mainWindow;
let tray = null;
let refreshInterval = null; 

const currentVersion = '1.4.5'; 
const appName = "Unofficial Fluxer Client";

// Pad naar het configuratiebestand (wordt opgeslagen in AppData)
const configPath = path.join(app.getPath('userData'), 'fluxer-client-config.json');

// Functie om instellingen te lezen
function getConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error reading config:', error);
  }
  return {};
}

// Functie om instellingen op te slaan
function saveConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config), 'utf8');
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

function performHardRefresh() {
  if (mainWindow) {
    session.defaultSession.clearCache().then(() => {
      console.log('Hard refresh triggered.');
      mainWindow.reload();
    });
  }
}

ipcMain.on('hard-refresh', () => { performHardRefresh(); });

function startSmartRefresh() {
  if (!refreshInterval) {
    console.log('App minimized/hidden. Smart refresh timer started (5 min).');
    refreshInterval = setInterval(() => {
      if (mainWindow) {
        console.log('Executing smart background refresh.');
        mainWindow.webContents.reloadIgnoringCache();
      }
    }, 300000); 
  }
}

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

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.fluxer.app' && parsedUrl.hostname !== 'fluxer.app') {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'web.fluxer.app' && parsedUrl.hostname !== 'fluxer.app') {
      shell.openExternal(url);
      return { action: 'deny' }; 
    }
    return { action: 'allow' };
  });

  session.defaultSession.clearCache().then(() => {
    mainWindow.loadURL('https://web.fluxer.app/');
  });

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

// Functie om de waarschuwing over de servers te tonen
function showServerWarning() {
  const config = getConfig();
  
  // Controleer of de gebruiker het vinkje al eens heeft aangezet
  if (!config.hideServerWarning) {
    dialog.showMessageBox({
      type: 'info',
      title: 'Notice: Fluxer Server Stability',
      message: 'Fluxer is a relatively new service and their servers may occasionally experience instability or downtime.\n\nIf the client seems unresponsive, stuck, or fails to load, this is usually due to Fluxer\'s servers and not a bug in this application.\n\nIf this happens, please use the "Clear Cache & Reload" option from the system tray icon.',
      buttons: ['Understood'],
      checkboxLabel: 'Don\'t show this message again',
      checkboxChecked: false,
      noLink: true
    }).then((result) => {
      // Als de gebruiker het vinkje aanzet, slaan we dit op
      if (result.checkboxChecked) {
        config.hideServerWarning = true;
        saveConfig(config);
      }
    });
  }
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
          dialog.showMessageBox({
            type: 'none', 
            title: 'Update Available',
            message: `A new version (${latestVersion}) is available!`,
            buttons: ['Download Update', 'Later'],
            noLink: true
          }).then((result) => {
            if (result.response === 0) {
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
  
  // Toon de waarschuwing direct na het opstarten
  showServerWarning();

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