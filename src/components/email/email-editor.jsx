import React, {Component} from 'react';
import LzEditor from './lz-editor/index';

export default class EmailEditorComponents extends Component {

    state = {
         html: ``,
         content: '<p ><br></p>'
    }

    receiveHtml = content => {
       this.setState({content});
    }

    resetHTML = () => {
        this.refs.LzEditor.resetEditorState();
    }
    
    render() {
        const {html} = this.state;
        return (
            <div className="LzEditor">
                <LzEditor 
                    ref="LzEditor"
                    active={true}
                    importContent={html}
                    cbReceiver={this.receiveHtml}
                    fullScreen={false}
                    convertFormat="html"
                    scrollHeight={390}
                />
            </div>
        )
    }
}