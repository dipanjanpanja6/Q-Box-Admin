import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { makeStyles } from '@material-ui/core';

const style = makeStyles(t => ({
    wraper: {
        width: 'inherit'
    }
}))
const EditorJS = (props) => {
    const sty = style()
    // const onEditorStateChange = (newData) => {
    //     props.onChange(newData);
    //     // setModel(newData)
    //     console.log(newData)
    // }

    return (
        <Editor
            wrapperClassName={sty.wraper}

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
