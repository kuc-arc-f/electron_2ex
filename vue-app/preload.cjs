const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('mytest1api', {
  test1api: (a) => ipcRenderer.invoke('test-first-api', a),
});

contextBridge.exposeInMainWorld('electronAPI', {
  readJsonFile: (filePath) => ipcRenderer.invoke('read-json-file', filePath),
});
contextBridge.exposeInMainWorld('myGetTemplateFile', {
  getTemplateFile: (a) => ipcRenderer.invoke('get-template-file', a),
});
contextBridge.exposeInMainWorld('myGetSysParams', {
  getSysParams: () => ipcRenderer.invoke('get-sys-params'),
});

