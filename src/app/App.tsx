import React, { useEffect, useRef, MutableRefObject } from "react"
import { useDispatch, useSelector } from "react-redux"
import truncate from "lodash/fp/truncate"

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

const truncateTitle = truncate({ length: 22 })
const truncatePreview = truncateTitle

function App() {
  const { currentNote, notes, error } = useSelector(
    (state: RootState) => state.notes
  )
  const dispatch: ThunkDispatch = useDispatch()
  const noteRef: MutableRefObject<any> = useRef()

  useEffect(() => {
    dispatch(fetchNotes()).then(() => {
      noteRef.current.focus()
    })
  }, [dispatch])

  function onSaveNote(value: string) {
    const matches = value.match(/(.*)(\n)+(.*)/)
    const data: NoteType = {
      modifiedDate: new Date().toString(),
      text: value,
      title: "",
      preview: ""
    }

    if (!matches) {
      data.title = truncateTitle(value)
      data.preview = ""
    } else {
      data.title = truncateTitle(matches[1])
      data.preview = truncatePreview(matches[3])
    }

    if (currentNote.id) {
      dispatch(updateNoteDb(data))
    } else {
      data.createdDate = new Date().toString()
      dispatch(createNoteDb(data))
    }
  }

  function onClickNote(id: string) {
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
      <div className="App-layout">
        <div className="App-sidebar">
          <NoteList
            currentNoteId={currentNote.id}
            onClickNote={onClickNote}
            notes={notes}
            error={error}
          />
        </div>
        <div className="App-content">
          <Note
            ref={noteRef}
            currentNoteId={currentNote.id}
            onSave={onSaveNote}
            onNewNote={onNewNote}
            onDeleteNote={onDeleteNote}
            noteText={currentNote.text}
          />
        </div>
      </div>
    </div>
  )
}

export default App