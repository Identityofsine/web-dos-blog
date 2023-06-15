import { fillerTextOne, fillerTextThree, fillerTextTwo, markdownexample } from "../../debug/STATIC_TEXT.js";
import { File } from "./File";

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
        const homeFolder = new DirectoryTree("home", rootFolder);
        rootFolder.children.push(homeFolder);
        homeFolder.children.push(new DirectoryTree("blogs", homeFolder));
        homeFolder.children.push(new DirectoryTree("blogs_old", homeFolder));


        return rootFolder;
    }
    
    /**
     * @summary This function is responsible for the cd command in web-dos. This checks the string if it is valid or contains any specials like ./ or ../ and responds. It returns false if the directory could not be found or isn't possible to cd into(like ../ on the root folder).
     * @param {string} path a string path to the new directory
     * @returns if the path was found (or changed)
     */
    changeDirectory(path : string) : boolean{
        if(path.length <= 0) return false;
        if(path.startsWith("/")) {
            if(path === "/") {
                this.currentFolder = this.rootFolder;
                return true;
            } else {
                //use recursion.
                let split = path.split("/");
                split = split.filter(x => x.trim() !== '');
                console.log(split);
                let pointer : DirectoryTree | undefined = this.rootFolder;
                for(let i = 0; i < split.length; i++) {
                    if(pointer === undefined) return false;
                    const _temp_pointer = pointer;
                    pointer = pointer.searchDirectory(split[i]);
                    if(pointer)
                        pointer.parent = _temp_pointer;
                }                
                if(pointer){
                    this.currentFolder = pointer;
                    return true;
                }
                return false;
            }
        }
        if(path === '../' || path === '..') {
            const _temp = this.currentFolder;
            if(this.currentFolder.parent !== undefined)
                this.currentFolder = this.currentFolder.parent;
            else 
                return false;
            return true;
        }
        if(path === '.' || path === './') return true;
				const _path_split = path.split('/');
				let _temp_currentFolder = this.currentFolder;
				console.log(_path_split);
				let _temp : DirectoryTree;
				for(let _potential_path of _path_split){
					const foundDIR = _temp_currentFolder.searchDirectory(_potential_path);
					if(foundDIR) {
							const _temp = _temp_currentFolder;
							foundDIR.parent = _temp;
							_temp_currentFolder = foundDIR;
					} else return false;
				}
				if(_path_split.length === 0) return false;
				this.currentFolder = _temp_currentFolder;
				return true;

    }

    getCurrentPath() : string {
        return this.currentFolder.returnPath();
    }

}

/**
 * This class is basically a directory, it hold children(both folders and files) and it keeps note of it's parent; this allows the Directory to pwd(print out current directory).
 */
export class DirectoryTree {
    //children of the tree
    folderName: string;
    parent : DirectoryTree | undefined;
    children : DirectoryTree[] = [];
    files : File[];

    constructor(folderName: string, parent : DirectoryTree | undefined = undefined) {
        this.folderName = folderName;
        this.parent = parent;
        this.files = [];
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
            childPaths.push(`*DIR* - ${dir.folderName}`);
        }
        for (let file of this.files) {
            childPaths.push(`*FILE* - ${file.getName()}`)
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

    /**
     * 
     * @param {File} file adds a file object (directorytree) to the directory. 
     */
    addFile(file : File) {
        this.files.push(file);
    }
    /**
     * @summary Searches for a file in the directory tree, if not found returns undefined.
     * @param name string Name
     * @returns {File | undefined} Returns foundFile if found, otherwise returns undefined
     */
    getFile(name : string) : File | undefined {
        // console.log("filename : %s", name);
        const foundFile = this.files.find(file => file.getName().toLocaleLowerCase() === name.toLocaleLowerCase());
        return foundFile;
    }

    closestItem (name : string) : string { 
        const closetDirectory = this.children.find(dir => dir.folderName.match(name));
        const closetFile = this.files.find(file => file.getName().match(name));
        if(closetFile) return closetFile.getName();
        if(closetDirectory) return closetDirectory.folderName;
        return "";
    }

}