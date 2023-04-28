import { ipcMain, systemPreferences } from "electron";


export function promptTouchID(win: Electron.BrowserWindow) {
  ipcMain.handle('prompt-touch-id', () => {
    if (systemPreferences.canPromptTouchID()) {
      systemPreferences.promptTouchID("Touch ID를 인증해주세요.").then((success) => {
        console.log("Touch ID 인증 성공")
      }).catch((error) => {
        console.log(error)
      })
    } else {
      console.log('Touch ID not available')
    }
  })
}