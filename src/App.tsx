import { useState } from 'react'
import Update from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.scss'
import { ipcRenderer } from "electron"

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)
  const [isPreventAppSuspension, setIsPreventAppSuspension] = useState(false)
  const [isPreventDisplaySleep, setIsPreventDisplaySleep] = useState(false)

  const onPreventAppSuspension = async () => {
    if (isPreventAppSuspension) {
      await ipcRenderer.invoke('allow-app-suspension')
      setIsPreventAppSuspension(false)
      return
    }

    await ipcRenderer.invoke('prevent-app-suspension')
    setIsPreventAppSuspension(true)
  }

  const onPreventDisplaySleep = async () => {
    if (isPreventDisplaySleep) {
      await ipcRenderer.invoke('allow-display-sleep')
      setIsPreventDisplaySleep(false)
      return
    }

    await ipcRenderer.invoke('prevent-display-sleep')
    setIsPreventDisplaySleep(true)
  }

  
  return (
    <div className='App'>
      <div className='logo-box'>
        <a href='https://github.com/electron-vite/electron-vite-react' target='_blank'>
          <img src={logoVite} className='logo vite' alt='Electron + Vite logo' />
          <img src={logoElectron} className='logo electron' alt='Electron + Vite logo' />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Electron + Vite logo to learn more
      </p>
      <div className='flex-center'>
        Place static files into the<code>/public</code> folder <img style={{ width: '5em' }} src='./node.svg' alt='Node logo' />
      </div>

      <Update />

      <button onClick={onPreventAppSuspension}>
        {!isPreventAppSuspension ? "Turn 'prevent-app-suspension'": "Turn off 'prevent-app-suspension'"}
      </button>

      <button onClick={onPreventDisplaySleep}>
        {!isPreventDisplaySleep ? "Turn 'prevent-display-sleep'": "Turn off 'prevent-display-sleep'"}
      </button>    
    </div>
  )
}

export default App
