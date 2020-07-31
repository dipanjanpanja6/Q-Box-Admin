import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorJS = (props) => {
    // const onEditorStateChange = (newData) => {
    //     props.onChange(newData);
    //     // setModel(newData)
    //     console.log(newData)
    // }

    return (
        <Editor

            readOnly
            toolbarHidden
            initialContentState={props.data}
            // editorClassName={classes.heading}
            // wrapperClassName={classes.heading}



            // onContentStateChange={this.onEditorStateChange}
        />
    )
}
export default EditorJS
