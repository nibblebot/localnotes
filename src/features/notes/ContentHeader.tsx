import React from "react"
import { Note } from "./notesSlice"

interface Props {
  showSidebar: boolean
  setShowSidebar: Function
  currentNote: Note
  onDeleteNote: Function
}

export default function ContentHeader({
  showSidebar,
  setShowSidebar,
  currentNote,
  onDeleteNote
}: Props) {
  return (
    <header className="content-header">
      {!showSidebar && (
        <i
          className="fas fa-chevron-left"
          onClick={() => setShowSidebar(true)}
        ></i>
      )}
      <div className="application-name">LocalNotes</div>
      {currentNote.id && (
        <>
          <div className="note-modified-date">{currentNote.modifiedDate}</div>
          <i className="fas fa-trash-alt" onClick={() => onDeleteNote()}></i>
        </>
      )}
    </header>
  )
}
