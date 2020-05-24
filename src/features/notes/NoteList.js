import React from "react"
import classnames from "classnames"
import "./NoteList.css"

function NoteList({ currentNoteId, onClickNote, notes, error }) {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <ul className="NoteList">
      {notes.map(note => (
        <li
          key={note.id}
          className={classnames("NoteListItem", {
            active: note.id === currentNoteId
          })}
          onClick={() => onClickNote(note.id)}
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
