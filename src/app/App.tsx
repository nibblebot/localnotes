import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { useDispatch, useSelector } from "react-redux"
import debounce from "lodash/debounce"
import { ContentEditableEvent } from "react-contenteditable"

import "./App.css"
import { RootState } from "./rootReducer"
import { ThunkDispatch } from "./store"
import NoteList from "features/notes/NoteList"
import Note from "features/notes/Note"
import {
  Note as NoteType,
  createDraftNote,
  deleteCurrentNoteDb,
  selectNote,
  selectFirstNote,
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
      if (noteRef.current) {
        noteRef.current.focus()
      }
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

  const debouncedSave = debounce((e: ContentEditableEvent) => {
    onSaveNote(e.target.value, noteRef.current.innerText)
  }, 500)

  function onOpenNote(note: NoteType) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setShowSidebar(false)
    }
    debouncedSave.cancel()
    dispatch(selectNote(note))
    noteRef.current.focus()
  }

  function onNewNote() {
    dispatch(createDraftNote())
    noteRef.current.focus()
  }

  function onDeleteNote() {
    debouncedSave.cancel()
    dispatch(deleteCurrentNoteDb()).then(() => {
      dispatch(selectFirstNote())
    })
  }

  return (
    <div className="App">
      <div
        className={
          "App-layout " + (showSidebar ? "sidebar-open" : "sidebar-closed")
        }
      >
        <aside className="App-sidebar">
          <header className="sidebar-header">
            <i className="fas fa-plus" onClick={() => onNewNote()}></i>
          </header>
          <NoteList
            currentNoteId={currentNote.id}
            onOpenNote={onOpenNote}
            notes={notes}
            error={error}
          />
        </aside>
        <main className="App-content">
          <header className="content-header">
            {!showSidebar && (
              <i
                className="fas fa-chevron-left"
                onClick={() => setShowSidebar(true)}
              ></i>
            )}
            <i className="fas fa-trash-alt" onClick={() => onDeleteNote()}></i>
          </header>
          <Note
            ref={noteRef}
            onSave={debouncedSave}
            currentNoteText={currentNote.text}
          />
        </main>
      </div>
    </div>
  )
}

export default App
