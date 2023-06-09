import { FileSystem } from "../directorytree/Directory";
import { Argument, ArgumentInput, Command, CommandList } from "./command";

export default function DEFAULT_COMMANDS(root : FileSystem) {
    CommandList.addCommand(new Command('hw', 'Prints out Hello World!', [], () => "Hello World!"));

    CommandList.addCommand(new Command('cd', 'Changed current directory', [new Argument('', 1, true, (path) => {return path.length > 0})], (args : ArgumentInput[] | undefined) => {

      if(!args || args.length <= 0) return "ERROR: No arguments";
      const _found_arg = args.find(arg => arg.name === '');
      if(!_found_arg || !_found_arg.content) return "ERROR: No arguments";
      const _cd_result = root.changeDirectory(_found_arg.content[0]);
      if(_cd_result) return `Current Directory: ${root.currentFolder.returnPath()}`;
        
      return "ERROR: Path not found!";
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
}