import { useEffect, useState } from "react";
import DosText from "../dos-text/dos-text";
import "./dos-currentline.scss"

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
                    console.log("i got hit")
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

export default DosCurrentLine;