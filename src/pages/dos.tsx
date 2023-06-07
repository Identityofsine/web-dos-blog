import React, { useEffect, useRef, useState } from 'react'
import './dos.scss';
import DosText from '../assets/elements/dos-text/dos-text';
import DosCurrentLine from '../assets/elements/dos-currentline/dos-currentline';



/**
 * @summary This function returns a dospage object, which should be the entire page, at some point there will be a context for the directory header for the new line.
 * @returns DosPage Element
 */
function DosPage() {

    const [curDirectory, setCurrentDirectory] = useState("C:\\sex>");
    const [oldCommands, setOldCommands] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current)
            ref.current.scrollTop = ref.current.scrollHeight;
    }, [oldCommands])

    const onEnterDos = (command : string) => {
        setOldCommands((preventry : any )=> {
            var temp = [...preventry];
            if (temp.at(temp.length - 1) === command) return preventry;
            if (command === " " || command === "")
                temp.push(String.fromCharCode(160));
            else
                temp.push(command);
            return temp;
        });
    }

  return (
    <div className='dos-command-page' ref={ref as React.RefObject<HTMLDivElement>}>
        <div className='dos-command-container'>
            {oldCommands.map(d => (
                <DosText text={d}/>
            ))}
            <DosCurrentLine text={curDirectory} onEnter={(command) => onEnterDos(command)}/>
        </div>
    </div>
  )
}

export default DosPage