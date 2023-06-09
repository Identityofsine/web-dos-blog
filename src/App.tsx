import { useEffect } from 'react'
import './App.scss'
import DosPage from './pages/dos'
import { Argument, ArgumentInput, Command, CommandList } from './obj/command/command'
import { FileSystem } from './obj/directorytree/Directory'
import DEFAULT_COMMANDS from './obj/command/_default_commands'




function App() {
  
  useEffect(() => {
  }, []) //commands

  useEffect(() => {
    //debug change
  }, [])

  return (
    <DosPage/>
  )
}

export default App
