import React from "react";
import "./NoteList.css";

function NoteList({ onClickNote, notes }) {
  return (
    <ul className="NoteList">
      {notes.map(note => (
        <li key={note.id} onClick={() => onClickNote(note.id)}>
          <strong>{note.title}</strong>
          <br />
          {note.preview}
        </li>
      ))}
    </ul>
  );
}
export default NoteList;
