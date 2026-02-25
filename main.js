const { app, BrowserWindow, Tray, Menu, session, dialog, net, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let warningWin; 
let tray = null;
let refreshInterval = null; 

const currentVersion = '1.4.9'; 
const appName = "FluxCap";

const configPath = path.join(app.getPath('userData'), 'fluxcap-config.json');

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

function saveConfig(config) {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
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
    refreshInterval = setInterval(() => {
      if (mainWindow) {
        mainWindow.webContents.reloadIgnoringCache();
      }
    }, 300000); 
  }
}

function stopSmartRefresh() {
  if (refreshInterval) {
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
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
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
  mainWindow.on('restore', stopSmartRefresh);

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function showServerWarning() {
  const config = getConfig();
  if (!config.hideServerWarning && mainWindow) {
    warningWin = new BrowserWindow({
      parent: mainWindow, 
      modal: true, 
      width: 540, 
      height: 460,
      frame: false, 
      resizable: false, 
      backgroundColor: '#1e1e1e',
      webPreferences: { 
        nodeIntegration: true, 
        contextIsolation: false 
      }
    });
    warningWin.loadFile('warning.html');
  }
}

ipcMain.on('close-server-warning', (event, dontShowAgain) => {
  if (dontShowAgain) {
    const config = getConfig();
    config.hideServerWarning = true;
    saveConfig(config);
  }

  if (warningWin) {
    warningWin.destroy(); 
    warningWin = null;
  }
});

function checkUpdates(manual = false) {
  const request = net.request('https://api.github.com/repos/ByAldon/FluxCap/releases/latest');
  request.on('response', (response) => {
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => {
      try {
        const data = JSON.parse(body);
        const latestVersion = data.tag_name.replace('v', '');
        if (latestVersion !== currentVersion) {
          dialog.showMessageBox({
            type: 'none', title: 'Update Available',
            message: `A new version (${latestVersion}) is available!`,
            buttons: ['Download Update', 'Later'],
            noLink: true
          }).then((result) => {
            if (result.response === 0) {
              shell.openExternal('https://github.com/ByAldon/FluxCap/releases/latest');
            }
          });
        } else if (manual) {
          dialog.showMessageBox({
            type: 'none', title: 'Up to Date',
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
  setTimeout(showServerWarning, 1000);

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
          else if (result.response === 1) shell.openExternal('https://github.com/ByAldon/FluxCap');
        });
      }
    },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  tray.setToolTip(appName);
  tray.setContextMenu(contextMenu);
  setTimeout(() => checkUpdates(false), 3000);
});