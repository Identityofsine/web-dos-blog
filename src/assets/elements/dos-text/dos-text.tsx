import React from 'react'
import "./dos-text.scss";

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

export default DosText