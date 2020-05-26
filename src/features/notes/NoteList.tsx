import React from "react"
import classnames from "classnames"
import "./NoteList.css"
import { Note } from "./notesSlice"

interface Props {
  currentNoteId?: string
  error: string | null
  notes: Note[]
  onOpenNote: Function
}

function NoteList({ currentNoteId, onOpenNote, notes, error }: Props) {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <ul className="NoteList">
      {notes.map(note => (
        <li
          key={note.id}
          data-testid="note-list-item"
          className={classnames("NoteListItem", {
            active: note.id === currentNoteId
          })}
          onClick={() => onOpenNote(note)}
        >
          <strong>{note.title}</strong>
          <br />
          {note.preview}
        </li>
      ))}
    </ul>
  )
}
export default NoteList
