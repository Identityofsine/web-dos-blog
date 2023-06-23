import React from "react";
import { FileSystem } from "../obj/directorytree/Directory";

interface StateContext <E> {
    state:E | undefined,
    setState:React.Dispatch<React.SetStateAction<E>>,
};

interface RefContext<E> {
	state: E | undefined,
	setState: (newVal : E) => void,
}


const emptyDirectoryContext : StateContext<string> = {
    state:"",
    setState:() => {},  
};

const emptyFileSystemContext : StateContext<FileSystem> = {
    state:undefined,
    setState:() => {},  
};

const emptyRefContext : RefContext<FileSystem> = {
	state: undefined,
	setState: () => {},
}


export const DirectoryContext = React.createContext(emptyDirectoryContext);

export const FileSystemContext = React.createContext(emptyFileSystemContext);
