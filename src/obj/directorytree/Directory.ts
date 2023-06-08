

export class FileSystem {
    rootFolder: DirectoryTree;
    currentFolder: DirectoryTree;
    constructor() {
        this.rootFolder = new DirectoryTree("/");
        this.currentFolder = this.rootFolder;
    }

    changeDirectory(path : string) {

    }

}


export class DirectoryTree {
    //children of the tree
    folderName: string;
    children : DirectoryTree[] = [];

    constructor(folderName: string){
        this.folderName = folderName;
    }

    /**
     * 
     * @param {string} path ./ and no / is treated as the same 
     */
    getDirectory(path: string) : DirectoryTree | undefined{
        if(path.trim() === "") return undefined;
        
    }

}