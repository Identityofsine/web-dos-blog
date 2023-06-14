import React from 'react'
import "./dos-text.scss";
import { TextEngine } from '../../../textengine/engine';

/**
* @summary This is a function that is responsible for displaying dos text onto the screen
* @param {string} text 
* @returns DosText Element
*/
const DosText = ({text = "", color = 'white' || 'yellow' || 'red', disableTextEngine = false}) => {
	return (
		<div className='dos-text'>
			{disableTextEngine ? 
				<span style={{color:color === 'white' ? '#ffffff' : color === 'yellow' ? '#ffff00' : color === 'red' ? '#ff0000' : '#ffffff'}}>
					{text}
				</span> 
			: 
				new TextEngine.MarkedText(text).returnElement()}
		</div>
			)
		}
		
		export default DosText