import {  useState } from 'react'
import './App.scss'
import { ipcRenderer } from "electron";

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)



function App() {
  const [selectedDir, setSelectedDir] = useState(__dirname);

  const selectDirectory = async () => {
    const dirs = await ipcRenderer.invoke('select-dirs');
    if (dirs && dirs.length > 0) {
      setSelectedDir(dirs[0]);
    }
  };

  const writeFiles = async () => {
    const result = await ipcRenderer.invoke('write-files', selectedDir);
    console.log(result);
  };
  

  console.log(selectedDir)

  return (
    <div className='App'>
      <div>Preparing to download...</div>
      <div className="img-box">
        <img
          src="https://ods-assets.s3.ap-northeast-2.amazonaws.com/TypeLogo/Over.svg"
          alt="logo"
          width={200}
          height={200}
        />
      </div>

      <div className="desc-box">
        <span>현재 노드 데이터를 다운로드 받는데 필요한 용량은 MB 정도 입니다.</span>
        <span>여유 공간은 MB 정도 필요할 수 있습니다.</span>
      </div>

      <div className="dir-box">
        <div title={selectedDir}>{selectedDir}</div>
        <button onClick={selectDirectory}>Select directory</button>
      </div>

      <br />

      <button onClick={writeFiles}>
        Write some files
      </button>
    </div>
  )
}

export default App
