//const { app, BrowserWindow} = require('electron/main');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path')
const fs = require('fs');
const fsPromises = require('fs').promises;
require('dotenv').config();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  //handle
  ipcMain.handle('test-first-api', async (_e, _arg) => {
    console.log("#test-first-api");
    console.log("Arguments received:", _arg); // 引数を確認
    return "ret.test-first-api: " + _arg;
  });

  // ファイルを読み取るIPCハンドラ
  ipcMain.handle('read-json-file', async (event, filePath) => {
    return new Promise((resolve, reject) => {
      const targetPath = path.join(__dirname, filePath);
      console.log("targetPath=", targetPath);
      fs.readFile(targetPath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });    
  });

  ipcMain.handle('get-template-file', async (event, filePath) => {
    try{
      const targetPath = path.join(__dirname, filePath);
      console.log("targetPath=", targetPath);
      // ファイルを非同期的に読み込む
      const fileBuffer = await fsPromises.readFile(targetPath);
        // Buffer を ArrayBuffer に変換
        const arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);
        return arrayBuffer;
      }catch(e){
        console.error(e);
        return null;
      }
  });

  ipcMain.handle('get-sys-params', async (_e) => {
    //console.log("#test-first-api");
    const retObj = {
      VITE_API_URL: process.env.VITE_API_URL,
      VITE_API_KEY: process.env.VITE_API_KEY,
    };
    return retObj;
  });

  win.loadFile('index.html')
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