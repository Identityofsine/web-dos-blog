import React, { useEffect, useRef, useState } from 'react'
import './dos.scss';
/**
 * @summary This is a function that is responsible for displaying dos text onto the screen
 * @param {string} text 
 * @returns DosText Element
 */
const DosText = ({text = ""}) => {
    return (
        <div className='dos-text'>
            <span>{text}</span>
        </div>
    )
}

type DosCurrentLineProps = {
    text: string,
    onEnter: (command : string) => void,
}


/**
 * @summary This is a function that is responsible for displaying the current Line and its header on the screen, this is very important for typing and should never be used twice.
 * @warning This function should only be used once -- ever.
 * @param {string} text 
 * @param {(command) => {}} onEnterFunction this function will be called whenever the user presses enter on their keyboard. 
 * @returns DosCurrentLine Object
 */
function DosCurrentLine({text, onEnter = (command) => {}} : DosCurrentLineProps) {
    
    const [keyboardinput, setKeyboardInput] = useState("");
    useEffect(() => {

        const handleKeyDown = (ev : KeyboardEvent) => {

            switch (ev.key) {
                case "Alt":
                case "Control":
                case "Shift":
                case "Meta":
                  // Exclude Alt, Ctrl, Shift, and Meta keys
                    return;
                default:
                    break;
            }


            if (ev.key === "Backspace" || ev.key === "Enter") {
                if(ev.key === "Backspace")
                    setKeyboardInput(prevstate => prevstate.slice(0, prevstate.length - 1))
                else if (ev.key === "Enter"){
                    //handle enter key
                    setKeyboardInput(prevstate => {onEnter(prevstate); return ''});
                }
            }
            else {
                if(ev.key === " ")
                    setKeyboardInput(prevState => prevState + String.fromCharCode(160));
                else
                    setKeyboardInput(prevState => prevState + ev.key);
            }

        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
          };
    }, [])




    return(
        <div className='dos-current-line'>
            <DosText text={text}/>
            <DosText text={keyboardinput}/>
            <span className='blinker'>_</span>
        </div>
    )
}


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