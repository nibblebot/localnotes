import React from "react"
import ContentEditable from "react-contenteditable"
import "./Note.css"
import debounce from "lodash/debounce"

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
    const debouncedSave = debounce(() => {
      onSave(ref.current.innerText)
    }, 500)
    return (
      <>
        <div className="Note">
          <ContentEditable
            innerRef={ref}
            className="ContentEditable"
            html={noteText.replace(/\n/g, "<br>")}
            onChange={debouncedSave}
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

Note.displayName = "Note"

export default Note
