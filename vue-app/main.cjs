const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path')
const fs = require('fs');
const fsPromises = require('fs').promises;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })
  //handle
  ipcMain.handle('test-first-api', async (_e, _arg) => {
    console.log("#test-first-api");
    console.log("Arguments received:", _arg); // 引数を確認
    return "ret.test-first-api: " + _arg;
  });

  win.loadFile('index.html');
  // Open the DevTools.
  //win.webContents.openDevTools();
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})