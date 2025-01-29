const { ipcRenderer, contextBridge } = require('electron');

/*
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
*/
//
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

