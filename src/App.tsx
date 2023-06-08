import { useEffect } from 'react'
import './App.scss'
import DosPage from './pages/dos'
import { Argument, ArgumentInput, Command, CommandList } from './obj/command/command'
import { FileSystem } from './obj/directorytree/Directory'




function App() {
  const root = new FileSystem();
  
  useEffect(() => {
    CommandList.addCommand(new Command('hw', 'Prints out Hello World!', [], () => "Hello World!"));
    CommandList.addCommand(new Command('cd', 'Changed current directory', [new Argument('dir', 1, true, (path) => {return path.length > 0})], (args : ArgumentInput[] | undefined) => {
      if(!args || args.length <= 0) return "ERROR: No arguments";
      return "ERROR: Function not implemented!";
    }));
    CommandList.addCommand(new Command('ls', 'List everything in the current directory', [], () => {
      let returnString = `Directory of ${root.currentFolder.returnPath()}\n`;
      const children = root.currentFolder.listChildren();
      for(let path of children) {
        returnString += path + '\n';
      };
      return returnString;
    }));
    CommandList.addCommand(new Command('vim', 'VIM Editor (Probably will never work)', [], () => "ERROR: Function not implemented!"));
    CommandList.addCommand(new Command('help', 'Prints out a table of commands', [], () => "ERROR: Function not implemented!"));
  }, []) //commands

  useEffect(() => {
    //debug change
  }, [])

  return (
    <DosPage/>
  )
}

export default App
