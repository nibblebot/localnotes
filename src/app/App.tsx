import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { useDispatch, useSelector } from "react-redux"

import "./App.css"
import { RootState } from "./rootReducer"
import { ThunkDispatch } from "./store"
import NoteList from "features/notes/NoteList"
import Note from "features/notes/Note"
import {
  Note as NoteType,
  createDraftNote,
  deleteCurrentNoteDb,
  fetchNote,
  updateNoteDb,
  createNoteDb,
  fetchNotes
} from "features/notes/notesSlice"

function App() {
  const { currentNote, notes, error } = useSelector(
    (state: RootState) => state.notes
  )
  const dispatch: ThunkDispatch = useDispatch()
  const noteRef: MutableRefObject<any> = useRef()
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    dispatch(fetchNotes()).then(() => {
      noteRef.current.focus()
    })
  }, [dispatch])

  function onSaveNote(html: string, text: string) {
    const matches = text.match(/(.*)(\n)+(.*)/)
    const data: NoteType = {
      modifiedDate: new Date().toString(),
      text: html,
      title: "",
      preview: ""
    }

    if (!matches) {
      data.title = text
      data.preview = ""
    } else {
      data.title = matches[1]
      data.preview = matches[3]
    }

    if (currentNote.id) {
      dispatch(updateNoteDb(data))
    } else {
      data.createdDate = new Date().toString()
      dispatch(createNoteDb(data))
    }
  }

  function onOpenNote(id: string) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setShowSidebar(false)
    }
    dispatch(fetchNote(id))
    noteRef.current.focus()
  }

  function onNewNote() {
    dispatch(createDraftNote())
    noteRef.current.focus()
  }

  function onDeleteNote() {
    dispatch(deleteCurrentNoteDb())
  }

  return (
    <div className="App">
      <header>
        {/* <button onClick={() => setShowSidebar(!showSidebar)}>
          Toggle Notes List
        </button> */}
        {!showSidebar && (
          <button onClick={() => setShowSidebar(true)}>&lt;</button>
        )}
      </header>
      <div
        className={
          "App-layout " + (showSidebar ? "sidebar-open" : "sidebar-closed")
        }
      >
        <aside className="App-sidebar">
          <NoteList
            currentNoteId={currentNote.id}
            onClickNote={onOpenNote}
            notes={notes}
            error={error}
          />
        </aside>
        <main className="App-content">
          <Note
            ref={noteRef}
            onSave={onSaveNote}
            onNewNote={onNewNote}
            onDeleteNote={onDeleteNote}
            currentNoteText={currentNote.text}
          />
        </main>
      </div>
    </div>
  )
}

export default App
