/**
 * Command Function that helps to execute commands entered from the prompt:
 */


export class Argument {
    private _id: string; // the id of the command
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
 * This class is used to contain command properties and methods to easily allow access and mutation to the commands and their behavior. This allows the commands to be easily added into the CommandList 
 */
export class Command {
    private _name: string;
    private _arguments: Argument[];
    private _description: string;
    private _function: (args : Argument[] | undefined) => string;

    /**
     * 
     * @param {string} name Name of Command
     * @param {string} description Command Description (used in help)
     * @param {Argument[]} arg Argument Array (if the command requires one)
     * @param {() => string} func onRun Function
     */
    constructor(name: string, description : string, arg: Argument[], func: () => string) {
        this._name = name;
        this._arguments = arg;
        this._description = description;
        this._function = func;
    }



    getDescription(): string { return this._description;}
    getName(): string { return this._name};
    call(args : Argument[] | undefined):string {return this._function(args);}
    overrideCall(_newfunc: () => string) {this._function = _newfunc;}
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
}


type CommandSettings = {
   command_nf_text : string, //Command Not Found Text
   command_onnf:(command : Command) => void
}





export default function handleCommand(command: string[], printFunction: (text: string) => void) : Boolean{
    if(command.length < 0) return false;
    const cmd = CommandList.getCommand(command[0]);
    if(cmd) {
        const args : Argument[] = [];
        //TODO: Write argument parsing function
        printFunction(cmd.call(args));
        return true;
    }
    // printFunction('sex');
    printFunction(`'${command[0]}' is not recognized as an internal or external command,
    operable program or batch file.`);    
    return false;
}