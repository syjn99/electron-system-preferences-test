import { powerMonitor } from "electron";

export function powerMonitoring(win: Electron.BrowserWindow) {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is going to sleep', new Date().toLocaleString())
  });

  powerMonitor.on('resume', () => {
    console.log('The system is waking up');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is waking up', new Date().toLocaleString())
  });

  powerMonitor.on('on-ac', () => {
    console.log('The system is on ac power');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is on ac power', new Date().toLocaleString())
  })

  powerMonitor.on('on-battery', () => {
    console.log('The system is on battery power');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is on battery power', new Date().toLocaleString())
  })

  powerMonitor.on('shutdown', () => {
    console.log('The system is shutting down');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is shutting down', new Date().toLocaleString())
  })

  powerMonitor.on('lock-screen', () => {
    console.log('The system is locking the screen');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is locking the screen', new Date().toLocaleString())
  })

  powerMonitor.on('unlock-screen', () => {
    console.log('The system is unlocking the screen');
    console.log(new Date().toLocaleString())
    win.webContents.send("main-process-message", 'The system is unlocking the screen', new Date().toLocaleString())
  })
}