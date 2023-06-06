/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import "./dos.scss";

const DosText = ({text = ""}) => {
    return (
        <div className='dos-text'>
            <span>{text}</span>
        </div>
    )
}


function DosCurrentLine({text, onEnter = (command) => {}}) {
    
    const [keyboardinput, setKeyboardInput] = useState("");
    useEffect(() => {

        const handleKeyDown = (ev) => {

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


function DosPage() {

    const [curDirectory, setCurrentDirectory] = useState("C:\\Sex>");
    const [oldCommands, setOldCommands] = useState([]);
    const ref = useRef();

    useEffect(() => {ref.current.scrollTop = ref.current.scrollHeight;}, [oldCommands])

    const onEnterDos = (command) => {
        setOldCommands(preventry => {
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
    <page ref={ref}>
        <div className='dos-command-container'>
            {oldCommands.map(d => (
                <DosText text={d}/>
            ))}
            <DosCurrentLine text={curDirectory} onEnter={(command) => onEnterDos(command)}/>
        </div>
    </page>
  )
}

export default DosPage