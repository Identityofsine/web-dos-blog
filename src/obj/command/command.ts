/**
 * Command Function that helps to execute commands entered from the prompt:
 */


export class Argument {
    private _id: string; // the id of the arg : '', '-d', or '--foo'
    private _expected_inputs: number; // the expected amount of inputs per arg, (0) meaning the arg is treated as a flag
    private onArgument: (input:String[]) => boolean; // function to be called when the argument is enabled
    private _required : boolean; // whether the argument is required
    
    constructor(name: string, expected_inputs: number, required: boolean, onArgument: (input:String[]) => boolean){
        this._id = name;
        this._expected_inputs = expected_inputs;
        this.onArgument = onArgument;
        this._required = required;
    }

    getID(): string { return this._id; }
    getInputs(): number { return this._expected_inputs; }
    isRequired(): boolean { return this._required; }
    call(input:String[]) : boolean { return this.onArgument(input);}

}

/**
 * This acts as a interface to help a command get it's arguments correctly, 
 */
export interface ArgumentInput {
    name: string;
    content: string[] | undefined;
}


/**
 * Listener for Commands
 */
export interface CommandListener {
    name: string,
    function: () => void,
}


/**
 * This class is used to contain command properties and methods to easily allow access and mutation to the commands and their behavior. This allows the commands to be easily added into the CommandList 
 */
export class Command {
    private _name: string;
    private _arguments: Argument[];
    private _description: string;
    private _function: (args : ArgumentInput[] | undefined) => string;
    private _listenerFunctions: (CommandListener)[] = [];
    /**
     * 
     * @param {string} name Name of Command
     * @param {string} description Command Description (used in help)
     * @param {Argument[]} arg Argument Array (if the command requires one)
     * @param {() => string} func onRun Function
     */
    constructor(name: string, description : string, arg: Argument[], func: (args : ArgumentInput[] | undefined) => string) {
        this._name = name;
        this._arguments = arg;
        this._description = description;
        this._function = func;
    }



    getDescription(): string { return this._description;}
    getName(): string { return this._name};
    overrideCall(_newfunc: () => string) {this._function = _newfunc;}
    runListeners() {
        for(let listener of this._listenerFunctions) {
            listener.function();
        }
    }
    addListener(listener: (CommandListener)) {
        let listener_copy = {...listener};
        listener_copy.name = listener.name.toLocaleLowerCase();
        this._listenerFunctions.push(listener_copy);
    }
    call(args : ArgumentInput[] | undefined):string {
        const _returnValue = this._function(args);
        this.runListeners(); 
        return _returnValue;
    }
}


/**
 * This class acts as a singleton instance for housing all the commands used throughout the web-app.
 */
export class CommandList {
    private static _commands : Command[] = [];
    
    private constructor(){
    }

    /**
     * @summary This adds a command to the list of commands, it checks if a command already exists with its name and if it doesnt it adds that command to the list
     * @param {Command} cmd
     */
    public static addCommand(cmd:Command) {
        const i = this._commands.find(c => c.getName() === cmd.getName());
        if(i) {
            console.log("ℹ️ Command Already Exists.")
        } else {
            this._commands.push(cmd);
        }
    }

    /**
     * @summary This gets the command in the list of commands, this should be quick and hopefully there isn't a plathora of commands.
     * @param {string} name Name of the command(case-insensitive)
     * @returns 
     */
    public static getCommand(name:string):Command | undefined {
        for(const cmd of this._commands) {
            if(cmd.getName().toLocaleLowerCase() === name.toLocaleLowerCase())
                return cmd;
        }
        return undefined;
    }

    public static getAllCommands():Command[] {
        return this._commands;
    }

    public static addCommandListener(commandName : string, listener : CommandListener) {
        const _command_name = commandName.toLocaleLowerCase();
        for(const command of this._commands) {
            if(command.getName().toLocaleLowerCase() === _command_name)
                {
                    //add listener to command
                    command.addListener(listener);
                    return;
                }
        }
    }
}


type CommandSettings = {
   command_nf_text : string, //Command Not Found Text
   command_onnf:(command : Command) => void
}





export default function handleCommand(command: string[], args : string[] = [], printFunction: (text: string) => void) : Boolean{
    if(command.length < 0) return false;
    const cmd = CommandList.getCommand(command[0]);
    if(cmd) {
        //TODO: Write argument parsing function
        type _argresponse = {
            argInput: ArgumentInput,
            iterate: boolean,
        };
        const createArgumentFromString = (text1: string, text2: string | undefined) : _argresponse => {
            let arg : ArgumentInput;
            if(text1.charAt(0) === '-') {
                //work with text2 instead
                if(!text2 || text2?.charAt(0) === '-')
                    arg = {name:text1,content:[]}
                else{
                    arg = {name:text1, content:[text2]};
                    return {argInput:arg, iterate:true};
                }
            } else {
                arg = {name: '', content:[text1]}
            }
            return {argInput:arg, iterate:false};
        }
        const _args : ArgumentInput[] = [];
        for(let i = 0; i < args.length; i++) {
            let _arg = args[i];
            let _arg_forward = args[i + 1];
            const _arg_function_response = createArgumentFromString(_arg, _arg_forward);
            if(_arg_function_response.iterate) i++;
            _args.push(_arg_function_response.argInput);
        }
        console.log("args : ", _args);
        printFunction(cmd.call(_args));
        return true;
    }
    // printFunction('sex');

    return false;
}