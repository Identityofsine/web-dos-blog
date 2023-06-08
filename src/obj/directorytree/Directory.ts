
/**
 * This class acts as a Drive for the emulated device. When instantiated, this object acts as a root directory; it keeps track of the currentFolder and the rootFolder (which never changes). There are methods to modify and manipulate the currentFolder.
 */
export class FileSystem {
    rootFolder: DirectoryTree;
    currentFolder: DirectoryTree;
    constructor() {
        this.rootFolder = this.initRootFolder();
        this.currentFolder = this.rootFolder;
    }

    private initRootFolder() : DirectoryTree {
        const rootFolder = new DirectoryTree("");
        rootFolder.children.push(new DirectoryTree("bin", rootFolder));
        rootFolder.children.push(new DirectoryTree("var", rootFolder));
        rootFolder.children.push(new DirectoryTree("etc", rootFolder));
        rootFolder.children.push(new DirectoryTree("temp", rootFolder));

        return rootFolder;
    }

    changeDirectory(path : string) : boolean{
        if(path === '../' || path === '..') {
            const _temp = this.currentFolder;
            if(this.currentFolder.parent !== undefined)
                this.currentFolder = this.currentFolder.parent;
            else 
                return false;
            return true;
        }
        if(path === '.' || path === './') return true;
        const foundDIR = this.currentFolder.searchDirectory(path);
        if(foundDIR) {
            const _temp = this.currentFolder;
            foundDIR.parent = _temp;
            this.currentFolder = foundDIR;
            return true;
        } else
            return false;
    }

    getCurrentPath() : string {
        return this.currentFolder.returnPath();
    }

}


export class DirectoryTree {
    //children of the tree
    folderName: string;
    parent : DirectoryTree | undefined;
    children : DirectoryTree[] = [];

    constructor(folderName: string, parent : DirectoryTree | undefined = undefined) {
        this.folderName = folderName;
        this.parent = parent;
    }

    /**
     * 
     * @param {string} path ./ and no / is treated as the same 
     */
    getDirectory(path: string) : DirectoryTree | undefined{
        if(path.trim() === "") return undefined;
    }
    /**
     * @summary This function is recursive. It assigns a variable, path, and adds on to it each iteration with recursion. The element getting recurred is the parent of the node (until you hit the root directory)
     * @returns Path as a string
     */
    returnPath() : string {
        let path = "";
        if(this.parent != undefined) {
            path += this.parent.returnPath();
        } 
        path += `${this.folderName}/`;
        return path;
    }

    /**
     * @summary This function returns all the paths in currentDirectory, this effectively works as an dir/ls function.
     * @returns String array of all the paths in a directory
     */
    listChildren() : string[] {
        const childPaths : string[] = [];
        for(let dir of this.children) {
            childPaths.push(dir.returnPath());
        }
        return childPaths;
    }
    /**
     * 
     * @param {string} folder This is the folder/file the function is looking for
     * @returns {DirectoryTree | undefined} a DirectoryTree object that is the foler/file in question, if the function doesn't find anything, it returns undefined.
     */
    searchDirectory(folder : string) : DirectoryTree | undefined {
        for(let dir of this.children) {
            if(dir.folderName === folder) return dir;
        }
        return undefined;
    }

}