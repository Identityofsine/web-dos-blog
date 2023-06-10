/**
 * File class for the FileStructure System
 */
export class File {
    private _name: string;
    private _onRun: () => string; //this function returns a string for printing

    /** 
     * @summary Constructor for the File structure
     */
    constructor(name: string, onRun: () => string) {
        this._name = name;
        this._onRun = onRun;
    }

    /**
     * @summary calls the private onRun Function
     * @returns {string} returns the string for printing purposes.
     */
    public call() : string {
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