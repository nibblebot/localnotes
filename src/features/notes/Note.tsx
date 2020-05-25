import React from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import "./Note.css"

interface NoteProps {
  onSave: (event: ContentEditableEvent) => void
  currentNoteText: string
}

const Note = React.forwardRef(
  ({ onSave, currentNoteText }: NoteProps, ref: any) => {
    return (
      <div className="Note">
        <ContentEditable
          innerRef={ref}
          className="ContentEditable"
          html={currentNoteText}
          onChange={onSave}
          data-testid="editable-note"
        />
      </div>
    )
  }
)

Note.displayName = "Note"

export default Note
