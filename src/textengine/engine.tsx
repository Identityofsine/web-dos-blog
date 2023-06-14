import React from 'react';

// Creating a namespace for the TextEngine
export namespace TextEngine {
	
	// Creating a class called MarkedText
	export class MarkedText { 
		// Private member variables
		private _default_text: string = "";
		private _element: React.JSX.Element = (<></>);
		
		// Constructor to initialize the MarkedText object
		constructor(text: string) {
			this._default_text = text;
			this._element = this.craftElement();
		}
		
		// Private method to create a code element
		private _createCodeElement(text: string): React.JSX.Element {
			return (<>{text}</>);
		}
		
		// Private method to create a quote element
		private _createQuoteElement(text: string): React.JSX.Element {
			const _text = text.replace('>', ''); // just replace one quote method
			return (<span style={{opacity:.6, fontSize:'.8em'}}>{_text}</span>);
		}
		
		// Private method to create a text element
		private _createTextElement(text: string): React.JSX.Element {
			return (<span>{text}</span>);
		}
		
		// Private method to create a subheader element
		private _createSubHeaderElement(text: string): React.JSX.Element {
			const _text = text.replaceAll('#', '');
			return (<h3>{_text}</h3>);
		}
		
		// Private method to create a header element
		private _createHeaderElement(text: string): React.JSX.Element {
			const _text = text.replaceAll('#', '');
			return (<h2>{_text}</h2>);
		}
		
		/**
		 * @summary This function analyzes a line and returns a correct response.
		 * @param {string} line 
		 * @returns {React.JSX.Element[]} This returns a array of React Elements for the line.
		 */
		private analyzeLine(line: string) : React.JSX.Element[]  {
			const _types = ['*', '**', '`'];
			const _stack : string[] = [];
			let _type_status = new Map(Object.entries({'*':false, '**':false, '`':false}));
			const _elements : JSX.Element[] = [];
			let _current_string = "";
			for(let i = 0; i < line.length; i++) {
				console.log(line[i]);
				const _cur_char = line.charAt(i);
				let _isHit = false;
				if(_cur_char === '\n') {
					_elements.push((<br/>))
					continue;
				}
				for(let t = 0; t < _types.length; t++) {
					if(_cur_char === _types[t]) {
						if(_type_status.get(_types[t])) {
							_stack.pop();
							_type_status.set(_types[t], false);
							_elements.push(<span className={`dos-${_types[t]}`}>{_current_string.trim()}</span>)
							_current_string = "";
						} 
						else {
							_stack.push(_cur_char);
							_type_status.set(_types[t], true);
						}
						_isHit = true;
						break;
					}
				}
				if(!_isHit)
					_current_string += _cur_char;
				else { 
					_elements.push((<span>{_current_string}</span>))
					_current_string = "";
				}
			}
			_elements.push((<span>{_current_string}</span>))
			return _elements;
		}
		
		// Private method to craft the final JSX element
		private craftElement(): React.JSX.Element {
			// Splitting the default text into lines using line break characters
			const _lines = this._default_text.split(/\r?\n/);
			
			// Array to hold the JSX elements for each line
			const _elements: React.JSX.Element[] = [];
			
			// Iterating over each line
			for (let _line of _lines) {
				// Checking if the line starts with '#', indicating a header
				if (_line.charAt(0) === '#') {
					// Checking if it's a subheader (starts with '##') or a header
					if (_line.charAt(1) === '#')
					_elements.push(this._createSubHeaderElement(_line));
					else
					_elements.push(this._createHeaderElement(_line));
				} else if(_line.charAt(0) === '>') {
					_elements.push(this._createQuoteElement(_line));
				} else {
					// If not a header, create a regular text element
					// _elements.push(this._createTextElement(_line));
					const _element_array = this.analyzeLine(_line);
					_element_array.forEach((elem) => _elements.push(elem));
					_elements.push((<br/>))
				}
			}
			
			// Returning the JSX element, mapping each element with a line break
			return (
				<>
				{_elements.map((e, i) => (
					<React.Fragment key={i}>
					{e}
					</React.Fragment>
					))}
					</>
					);
				}
				
				// Public method to return the final JSX element
				public returnElement(): React.JSX.Element {
					return this._element;
				}
			}
		}
		