import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import "./Note.css";

function Note({ onSave, noteText }) {
  // const onContentChange = debounce(e => {
  //   onSave(e.target.value);
  // }, 200);

  const contentEditableRef = useRef();

  function onSaveClick() {
    console.log(contentEditableRef.current.innerText);
    onSave(contentEditableRef.current.innerText);
  }

  return (
    <div className="Note">
      <ContentEditable
        innerRef={contentEditableRef}
        className="ContentEditable"
        // onChange={onContentChange}
        html={noteText.replace(/\n/g, "<br>")}
      />
      <div>
        <button onClick={onSaveClick}>Save</button>
      </div>
    </div>
  );
}

export default Note;
