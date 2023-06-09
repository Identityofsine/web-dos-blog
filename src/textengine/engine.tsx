import React from 'react';
export namespace TextEngine{
    
    export class MarkedText { 
        private _default_text: string = "";
        private _element: React.JSX.Element = (<></>);

        private _createCodeElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createQuoteElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createTextElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createSubHeaderElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private _createHeaderElement(text : string) : React.JSX.Element {
            return (<>{text}</>)
        }

        private craftElement() : React.JSX.Element {
            return (<></>);
        }

        public returnElement() : React.JSX.Element {
            return this._element;
        }

    }
}