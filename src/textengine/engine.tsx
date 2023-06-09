import React from 'react';
export namespace TextEngine{
    
    export class MarkedText { 
        private _default_text: string = "";
        private _element: React.JSX.Element = (<></>);

        constructor(text : string) {
            this._default_text = text;
            this._element = this.craftElement();
        }

        private _createCodeElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createQuoteElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createTextElement(text : string) : React.JSX.Element {
            return (<span>{text}</span>)
        }

        private _createSubHeaderElement(text : string) : React.JSX.Element {
            const _text = text.replaceAll('#', '');

            return (<h3>{_text}</h3>)
        }

        private _createHeaderElement(text : string) : React.JSX.Element {
            const _text = text.replaceAll('#', '');
            return (<h2>{_text}</h2>)
        }

        private craftElement() : React.JSX.Element {
            const _lines = this._default_text.split(/\r?\n/);
            console.log(_lines);
            const _elements : React.JSX.Element[] = [];
            for(let _line of _lines) {
                if(_line.charAt(0) === '#') {
                    if(_line.charAt(1) === '#')
                        _elements.push(this._createSubHeaderElement(_line));
                    else
                        _elements.push(this._createHeaderElement(_line));
                }
                else
                    _elements.push(this._createTextElement(_line));
            }

            return (
                <>
                    {_elements.map((e, i) => (<>{e}<br/></>))}
                </>
            );
        }

        public returnElement() : React.JSX.Element {
            return this._element;
        }

    }
}