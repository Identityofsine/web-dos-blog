/**
 * Command Function that helps to execute commands entered from the prompt:
 */


class Argument {
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


class Command {
    private _name: string;
    private _arguments: Argument[];
    private _function: () => string;

    constructor(name: string, arg: Argument[], func: () => string) {
        this._name = name;
        this._arguments = arg;
        this._function = func;
    }

    getName(): string { return this._name};
    call():string {return this._function();}
}


class CommandList {
    private static _commands : Command[];
    
    constructor(){
        CommandList._commands = [];
    }

    public static addCommand(cmd:Command) {
        const i = CommandList._commands.find(c => c.getName() === cmd.getName());
        if(i) {
            console.log("ℹ️ Command Already Exists.")
        } else {
            CommandList._commands.push(cmd);
        }
    }

    public static getCommand(name:string):Command | undefined {
        for(const cmd of CommandList._commands) {
            if(cmd.getName().toLocaleLowerCase() === name.toLocaleLowerCase())
                return cmd;
        }
        return undefined;
    }
}


type CommandSettings = {
   command_nf_text : string, //Command Not Found Text
   command_onnf:(command : Command) => void
}





function handleCommand(command: string[], printFunction: (text: string) => void) : Boolean{
    if(command.length < 0) return false;
    const cmd = CommandList.getCommand(command[0]);
    if(cmd) {
        printFunction(cmd.call());
        return true;
    }

    printFunction(`'${command[0]}' is not recognized as an internal or external command,
    operable program or batch file.`);    
    return false;
}