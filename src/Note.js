import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import "./Note.css";

function Note({ currentNoteId, onSave, onDeleteNote, onNewNote, noteText }) {
  const contentEditableRef = useRef();

  function onSaveClick() {
    onSave(contentEditableRef.current.innerText);
  }

  return (
    <>
      <div className="Note">
        <ContentEditable
          innerRef={contentEditableRef}
          className="ContentEditable"
          html={noteText.replace(/\n/g, "<br>")}
        />
      </div>
      <div className="NoteMeta">
        <span>Note ID: {currentNoteId}</span>
        <div>
          <button onClick={onNewNote}>New Note</button>
          <button onClick={onDeleteNote}>Delete Note</button>
          <button onClick={onSaveClick}>Save</button>
        </div>
      </div>
    </>
  );
}

export default Note;
