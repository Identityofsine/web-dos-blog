import { useEffect } from 'react'
import './App.scss'
import DosPage from './pages/dos'
import { Argument, Command, CommandList } from './obj/command/command'

function App() {

  useEffect(() => {
    CommandList.addCommand(new Command('hw', 'Prints out Hello World!', [], () => "Hello World!"));
    CommandList.addCommand(new Command('cd', 'Changed current directory', [], () => "ERROR: Function not implemented!"));
    CommandList.addCommand(new Command('vim', 'VIM Editor (Probably will never work)', [], () => "ERROR: Function not implemented!"));
    CommandList.addCommand(new Command('help', 'Prints out a table of commands', [], () => "ERROR: Function not implemented!"));

  }, []) //commands

  return (
    <DosPage/>
  )
}

export default App
