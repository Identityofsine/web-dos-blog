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
    private _function: () => void;

    constructor(name: string, arg: Argument[], func: () => void) {
        this._name = name;
        this._arguments = arg;
        this._function = func;
    }

    getName(): string { return this._name};
    call() {this._function();}
}


class CommandList {
    private _commands : Command[];
    
    constructor(){
        this._commands = [];
    }

    addCommand(cmd:Command) {
        const i = this._commands.find(c => c.getName() === cmd.getName());
        if(i) {
            console.log("ℹ️ Command Already Exists.")
        } else {
            this._commands.push(cmd);
        }
    }
}


type CommandSettings = {
   command_nf_text : string, //Command Not Found Text
   command_onnf:(command : Command) => void
}





function handleCommand() : Boolean{

    return false;
}