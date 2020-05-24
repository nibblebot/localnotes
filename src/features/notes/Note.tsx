import React from "react"
import ContentEditable from "react-contenteditable"
import "./Note.css"

interface NoteProps {
  currentNoteId?: string
  noteText: string
  onSave: Function
  onDeleteNote: Function
  onNewNote: Function
}

const Note = React.forwardRef(
  (
    { currentNoteId, onSave, onDeleteNote, onNewNote, noteText }: NoteProps,
    ref: any
  ) => {
    return (
      <>
        <div className="Note">
          <ContentEditable
            innerRef={ref}
            className="ContentEditable"
            html={noteText.replace(/\n/g, "<br>")}
            onChange={() => {}}
          />
        </div>
        <div className="NoteMeta">
          <span>Note ID: {currentNoteId}</span>
          <div>
            <button onClick={() => onNewNote()}>New Note</button>
            <button onClick={() => onDeleteNote()}>Delete Note</button>
            <button
              onClick={() => {
                onSave(ref.current.innerText)
                ref.current.focus()
              }}
            >
              Save
            </button>
          </div>
        </div>
      </>
    )
  }
)

export default Note
