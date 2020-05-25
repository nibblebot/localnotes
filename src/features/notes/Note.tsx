import React from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import "./Note.css"

interface NoteProps {
  onSave: (event: ContentEditableEvent) => void
  currentNoteText: string
}

const Note = React.forwardRef(
  ({ onSave, currentNoteText }: NoteProps, ref: any) => {
    console.log("current note text: ", currentNoteText)

    return (
      <>
        <div className="Note">
          <ContentEditable
            innerRef={ref}
            className="ContentEditable"
            html={currentNoteText}
            onChange={onSave}
          />
        </div>
      </>
    )
  }
)

Note.displayName = "Note"

export default Note
