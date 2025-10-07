const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // You can add custom APIs here if needed
  platform: process.platform,
  
  // Example: Add methods to communicate with main process
  // openExternal: (url) => ipcRenderer.invoke('open-external', url),
  // getAppVersion: () => ipcRenderer.invoke('get-app-version')
});

// Security: Remove any Node.js APIs from the window object
delete window.require;
delete window.exports;
delete window.module;