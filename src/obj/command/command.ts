/**
 * Command Function that helps to execute commands entered from the prompt:
 */


export class Argument {
    private _id: string; // the id of the command
    private _expected_inputs: number; // the expected amount of inputs per arg, (0) meaning the arg is treated as a flag
    private onArgument: (input:String[]) => boolean; // function to be called when the argument is enabled
    
    constructor(name: string, expected_inputs: number, onArgument: (input:String[]) => boolean){
        this._id = name;
        this._expected_inputs = expected_inputs;
        this.onArgument = onArgument;
    }

    getID(): string { return this._id; }
    getInputs(): number { return this._expected_inputs; }
    call(input:String[]) : boolean { return this.onArgument(input);}

}


export class Command {
    private _name: string;
    private _arguments: Argument[];
    private _description: string;
    private _function: () => string;

    constructor(name: string, description : string, arg: Argument[], func: () => string) {
        this._name = name;
        this._arguments = arg;
        this._description = description;
        this._function = func;
    }



    getDescription(): string { return this._description;}
    getName(): string { return this._name};
    call():string {return this._function();}
    overrideCall(_newfunc: () => string) {this._function = _newfunc;}
}


export class CommandList {
    private static _commands : Command[] = [];
    
    constructor(){
    }

    public static addCommand(cmd:Command) {
        const i = this._commands.find(c => c.getName() === cmd.getName());
        if(i) {
            console.log("ℹ️ Command Already Exists.")
        } else {
            this._commands.push(cmd);
        }
    }

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
        printFunction(cmd.call());
        return true;
    }
    // printFunction('sex');
    printFunction(`'${command[0]}' is not recognized as an internal or external command,
    operable program or batch file.`);    
    return false;
}