import React from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import debounce from "lodash/debounce"

import "./Note.css"

interface NoteProps {
  onDeleteNote: Function
  onNewNote: Function
  onSave: Function
  currentNoteText: string
}

const Note = React.forwardRef(
  (
    { onSave, onDeleteNote, onNewNote, currentNoteText }: NoteProps,
    ref: any
  ) => {
    const debouncedSave = debounce((e: ContentEditableEvent) => {
      onSave(e.target.value, ref.current.innerText)
    }, 500)

    return (
      <>
        <div className="Note">
          <ContentEditable
            innerRef={ref}
            className="ContentEditable"
            html={currentNoteText}
            onChange={debouncedSave}
          />
        </div>
        <div className="NoteMeta">
          <div>
            <button onClick={() => onNewNote()}>New Note</button>
            <button onClick={() => onDeleteNote()}>Delete Note</button>
          </div>
        </div>
      </>
    )
  }
)

Note.displayName = "Note"

export default Note
