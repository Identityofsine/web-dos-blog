import { useEffect, useRef, useState } from 'react'
import './App.scss'
import DosPage from './pages/dos'
import { FileSystem } from './obj/directorytree/Directory';
import { FileSystemContext } from './context/context';




function App() {
  
	const [root, setRoot] = useState(new FileSystem());


  useEffect(() => {
  }, []) //commands

  useEffect(() => {
    //debug change
  }, [])

  return (
		<FileSystemContext.Provider value={{state:root, setState:() => {}}}>
			<DosPage/>
		</FileSystemContext.Provider>
  )
}

export default App
