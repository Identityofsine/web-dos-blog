import React from "react";

interface StateContext <E> {
    state:E,
    setState:React.Dispatch<React.SetStateAction<E>>,
};

const emptyDirectoryContext : StateContext<string> = {
    state:"",
    setState:() => {},  
};

export const DirectoryContext = React.createContext(emptyDirectoryContext);