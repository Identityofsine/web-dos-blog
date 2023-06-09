import { useEffect, useState } from "react";
import DosText from "../dos-text/dos-text";
import "./dos-currentline.scss"

type DosCurrentLineProps = {
    text: string,
    onEnter: (command : string) => string,
}


/**
 * @summary This is a function that is responsible for displaying the current Line and its header on the screen, this is very important for typing and should never be used twice.
 * @warning This function should only be used once -- ever.
 * @param {string} text 
 * @param {(command) : string => {}} onEnterFunction this function will be called whenever the user presses enter on their keyboard. 
 * @returns DosCurrentLine Object
 */
function DosCurrentLine({text, onEnter = (command) => "" } : DosCurrentLineProps) {
    
    const [keyboardinput, setKeyboardInput] = useState("");

    useEffect(() => {
        //this function handles on keydown events
        const handleKeyDown = (ev : KeyboardEvent) => {
            //ignore these keys for now
            switch (ev.key) {
                case "Alt":
                case "Control":
                case "Shift":
                case "Meta":
                    // Exclude Alt, Ctrl, Shift, and Meta keys
                    return;
                case "Tab":
                    // autofill code
                    
                    ev.preventDefault();
                    return;
                default:
                    break;
            }

            //backspace or enter
            if (ev.key === "Backspace" || ev.key === "Enter") {
                //weird if statement but it works
                if(ev.key === "Backspace") {
                    //handle backspace
                    setKeyboardInput(prevstate => prevstate.slice(0, prevstate.length - 1));
                    return;
                }
                else if (ev.key === "Enter"){
                    //handle enter key
                    console.log("enter key");
                    setKeyboardInput(onEnter(keyboardinput));
                }
            }
            else {
                if(ev.key === " ") //handle space character
                    setKeyboardInput(prevState => prevState + String.fromCharCode(160));
                else //print regular character
                    setKeyboardInput(prevState => prevState + ev.key);
            }

        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
          };
    }, [keyboardinput])




    return(
        <div className='dos-current-line'>
            <DosText text={text}/> 
            <DosText text={keyboardinput}/>
            <span className='blinker'>_</span>
        </div>
    )
}

export default DosCurrentLine;