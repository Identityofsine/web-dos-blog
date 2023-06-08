

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

    returnPath() : string {
        let path = "";
        if(this.parent != undefined) {
            path += this.parent.returnPath();
        } 
        path += `${this.folderName}/`;
        return path;
    }

    listChildren() : string[] {
        const childPaths : string[] = [];
        for(let dir of this.children) {
            childPaths.push(dir.returnPath());
        }
        return childPaths;
    }

    searchDirectory(folder : string) : DirectoryTree | undefined {
        for(let dir of this.children) {
            if(dir.folderName === folder) return dir;
        }
        return undefined;
    }

}