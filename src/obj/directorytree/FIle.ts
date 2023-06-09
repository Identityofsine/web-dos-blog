export class File {
    private _name: string;
    _onRun: () => void;

    constructor(name: string, onRun: () => void) {
        this._name = name;
        this._onRun = onRun;
    }
}