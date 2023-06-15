import { useContext, useEffect, useState } from "react";
import DosText from "../dos-text/dos-text";
import "./dos-currentline.scss"
import { autoFill } from "../../../util/autofill";
import { FileSystemContext } from "../../../context/context";

type DosCurrentLineProps = {
	text: string,
	onEnter: (command : string) => string,
	onArrowUp: (i : number) => string	,
	arrowLimit: number,
}


/**
* @summary This is a function that is responsible for displaying the current Line and its header on the screen, this is very important for typing and should never be used twice.
* @warning This function should only be used once -- ever.
* @param {string} text 
* @param {(command) : string => {}} onEnterFunction this function will be called whenever the user presses enter on their keyboard. 
* @returns DosCurrentLine Object
*/
function DosCurrentLine({text, onEnter = (command) => "", onArrowUp = (i : number) => "", arrowLimit = 0} : DosCurrentLineProps) {
	
	const [keyboardinput, setKeyboardInput] = useState("");
	const [_command_history_index, _set_command_history_index] = useState(1);
	const root = useContext(FileSystemContext);
	useEffect(() => {
		//this function handles on keydown events
		const handleKeyDown = (ev : KeyboardEvent) => {
			//ignore these keys for now
			switch (ev.key) {
				case "Alt":
				case "Control":
				case "Shift":
				case "Escape":
				case "Meta":
				// Exclude Alt, Ctrl, Shift, and Meta keys
					_set_command_history_index(1);
					ev.preventDefault;
					return;
				case "ArrowUp":
					let _arrow_up_response = onArrowUp(_command_history_index);
					_set_command_history_index((prev) => {
						const _val = prev + 1;
						if (_val >= arrowLimit)
							return arrowLimit;
						return _val;
					});
					if(!_arrow_up_response)
						return;
					setKeyboardInput(_arrow_up_response);
					return;
				case "ArrowDown":
					_set_command_history_index((prev) => {
						const _val = prev - 1;
						if(_val < 2) return 2;
						return _val;
					});
					let _arrow_down_response = onArrowUp(_command_history_index - 1);
					if(!_arrow_down_response)
						return;
					setKeyboardInput(_arrow_down_response);
					return;
				case "Tab":
					//TODO :: WRITE TAB HANDLING CODE (AUTO COMPLETION)
					autoFill(keyboardinput, setKeyboardInput, root.state?.currentFolder);
					ev.preventDefault();
					return;
				default:
					_set_command_history_index(1);
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
	}, [keyboardinput, _command_history_index])
	
	useEffect(() => {
		console.log("_Command_INDEX: %s", _command_history_index);
	}, [_command_history_index])
	
	
	
	return(
		<div className='dos-current-line'>
		<DosText text={text}/> 
		<DosText text={keyboardinput} disableTextEngine={true}/>
		<span className='blinker'>_</span>
		</div>
		)
	}
	
	export default DosCurrentLine;