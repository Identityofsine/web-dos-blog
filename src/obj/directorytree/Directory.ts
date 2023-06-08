

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
        return rootFolder;
    }

    changeDirectory(path : string) {

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

}