export class File {
    private _name: string;
    private _onRun: () => void;

    constructor(name: string, onRun: () => void) {
        this._name = name;
        this._onRun = onRun;
    }

    /**
     * @summary calls the private onRun Function
     * @returns {void} onRun Function
     */
    public call() {
        return this._onRun();
    }

    /**
     * @summary Returns the name of the file
     * @returns {string} Returns the name of the file
     */
    public getName() : string { 
        return this._name; 
    }
}