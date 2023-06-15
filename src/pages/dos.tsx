import React, { useEffect, useRef, useState } from 'react'
import './dos.scss';
import DosText from '../assets/elements/dos-text/dos-text';
import DosCurrentLine from '../assets/elements/dos-currentline/dos-currentline';
import handleCommand, { Command, CommandList } from '../obj/command/command';
import { DirectoryContext, FileSystemContext } from '../context/context';
import DEFAULT_COMMANDS from '../obj/command/_default_commands';
import { FileSystem } from '../obj/directorytree/Directory';
import { File } from '../obj/directorytree/File';



/**
 * @summary This function returns a dospage object, which should be the entire page, at some point there will be a context for the directory header for the new line.
 * @returns DosPage Element
 */
function DosPage() {

    const [curDirectory, setCurrentDirectory] = useState("C:/>");
    const [oldCommands, setOldCommands] = useState<string[]>([]);
		const [usedCommands, setUsedCommands] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const [root, setRoot] = useState(new FileSystem());

    /**
     * @summary Simple function that creates and assigns commands their functions...
     */
    const commandConfigs = () => {
        CommandList.getCommand("help")?.overrideCall(() => {
            var outputstring = "#HELP MENU\n";
            outputstring += "Welcome to build ??? of the web-dos project, this project aims to provide a template for web-dos applications (for those who want to take advantage of the primitive terminal for projects in design or games).\n\nThese are commands that are baked into the application, more can be added on startup (~/pages/dos.tsx). As of build ???, a lot of these commands do not work and some may never will be made.\n\n##D.I.Y Example\nTo see the text-engine demo, run:\n`cd /home/blogs`\n\nTake a look around by typing:\n>ls \n\n\nTo run a file type in its name and press enter!\n\n"
            
            outputstring += "=#=#=#=#=#=#=#=DOS-WEB-DEFAULT HELP=#=#=#=#=#=#=#=\n";
            const commands = CommandList.getAllCommands();
            for(let i = 0; i < commands.length; i++) {
                const cmd : Command = commands[i];
								if(cmd.getName().trim() === '') continue;
                outputstring += `${cmd.getName()} - ${cmd.getDescription()}\n`;
            }
            outputstring += "=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#==#=#=#=#=#=#=#=\n";

            return outputstring;
        });
        CommandList.addCommandListener("cd", {name: "changedir", function: () => {
            const responseValue = root.getCurrentPath();
            setCurrentDirectory(`C:${responseValue.substring(0, responseValue.length - 1)}>`);
        }});
    }

    useEffect(() => {
        DEFAULT_COMMANDS(root);
        commandConfigs();
    }, []);


    useEffect(() => {
        //scroll to the bottom when a new line is printed
        if (ref.current)
            ref.current.scrollTop = ref.current.scrollHeight;
    }, [oldCommands])

		useEffect(() => {
			document.title = curDirectory;
		}, [curDirectory]);

    //onenter function passed into DosCurrentLine
    const onEnterDos = (command: string) => {
        const _mutated_command = command.trim().split(/\s+/);
        const _real_command = _mutated_command[0].trim();
        const pushCommandToStack = (_command: string, stack: any[]) => {
            var temp = [...stack];
            if (temp.at(temp.length - 1) === _command)
                return stack;
            if (_command === " " || _command === "")
                temp.push(String.fromCharCode(160));
            else
                temp.push(_command);
            return temp;
        }
        pushCommandToStack(_real_command, oldCommands);
				setUsedCommands((prev) => [...prev, command]);
        //set the state of the function
        const setCMDState = (_command: string) => {
            setOldCommands((preventry: any) => {
                return pushCommandToStack(_command, preventry);
            });
        }
        const _args_passthrough = _mutated_command.splice(1, _mutated_command.length - 1);
        setCMDState(command + '\n');
        const _command_response = handleCommand([_real_command], _args_passthrough, (_command: string) => setCMDState(_command));
        if(_command_response) return '';
        else {
            // TODO: handle files in the directory
            let does_file_exist : File | undefined;
            if(command.slice(0 , 2) == './')
                does_file_exist = root.currentFolder.getFile(command.slice(2, command.length));
            else
                does_file_exist = root.currentFolder.getFile(command);
            if (does_file_exist) {
                setCMDState(does_file_exist.call());
            } else {
                setCMDState(`'${command}' is not recognized as an internal or external command,
                operable program or batch file.`);    
            }
        }
        return '';
    }
		
		/**
		 * 
		 * @param {number} i iterate under.
		 * @returns onArrowUp Function
		 */
		const onArrowUp = (i = 1) : string => {
			if(i < 1 || i > usedCommands.length) return ''; 
			const _return = usedCommands.at(usedCommands.length - i)
			if(_return)
				return _return;
			else
				return '';
		};


    return (
        <FileSystemContext.Provider value={{state: root, setState: setRoot}}>
            <DirectoryContext.Provider value={{state:curDirectory, setState:setCurrentDirectory}}>
                <div className='dos-command-page' ref={ref as React.RefObject<HTMLDivElement>}>
                    <div className='dos-command-container'>
                        {oldCommands.map(d => (
                            <DosText text={d} color='white' />
                        ))}
                        <DosCurrentLine text={curDirectory} onEnter={(command) => { onEnterDos(command); return ""; }} onArrowUp={onArrowUp} arrowLimit={usedCommands.length} />
                    </div>
                </div>
            </DirectoryContext.Provider>
        </FileSystemContext.Provider>
    )
}

export default DosPage
