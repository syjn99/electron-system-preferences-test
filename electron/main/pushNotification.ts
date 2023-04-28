import { Notification, ipcMain } from "electron";
import path from 'path';

const options = {
  title: 'Custom Notification',
  subtitle: 'Subtitle of the Notification',
  body: 'Body of Custom Notification',
  silent: true,
  // Need to set icon path
  icon: path.join(__dirname, '../../dist/icon.png'),
  hasReply: true,
  // toastXml is for Windows 10 Toast Notification only
  toastXml: `
  <toast launch="myapp:action=navigate&amp;contentId=351" activationType="protocol">
      <visual>
          <binding template="ToastGeneric">
              <text>Hello world</text>
          </binding>
      </visual>
      <actions>
          <action
              content="See more details"
              arguments="myapp:action=viewDetails&amp;contentId=351"
              activationType="protocol"/>

          <action
              content="Remind me later"
              arguments="myapp:action=remindlater&amp;contentId=351"
              activationType="protocol"/>
      </actions>
  </toast>`
//   // timeoutType: 'never', 
//   replyPlaceholder: '여기에 답장을 해주세요.',
//   // sound: path.join(__dirname, '../assets/sound.mp3'),
//   // urgency: 'critical' ,
//   closeButtonText: '노티 닫기!!!',
//   actions: [ {
//       type: 'button',
//       text: '첫번째 옵션'
//   },{
//     type: 'button',
//     text: '두번째 옵션'
// }],
}


export function pushNotification(win: Electron.BrowserWindow) {
  const notification = new Notification(options)

  ipcMain.handle('push-notification', () => {
    notification.show()
  })

  // notification has many events.
  notification.on("reply", (event, msg) => {
    console.log("reply", msg)
  })

  notification.on("click", (event) => {
    console.log(event)
  })

  notification.on("action", (event, index) => {
    console.log("action", index)
  })
}