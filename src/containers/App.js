import React, { useState, useEffect } from "react"
import "./App.css"
import NoteList from "../components/NoteList"
import Note from "../components/Note"
import db from "../db"

function App() {
  const DEFAULT_NOTE = { text: "" }
  const [currentNoteId, setCurrentNoteId] = useState()
  const [currentNote, setCurrentNote] = useState(DEFAULT_NOTE)

  const [notes, setNotes] = useState([])

  useEffect(() => {
    db.table("notes")
      .toCollection()
      .reverse()
      .sortBy("date")
      .then(notes => {
        setNotes(notes)
      })
  }, [])

  function onSaveNote(value) {
    const matches = value.match(/(.*)\n(.*)/)
    const data = {}

    data.date = new Date()
    data.text = value

    if (!matches) {
      data.title = value
      data.preview = null
    } else {
      data.title = matches[1]
      data.preview = matches[2]
    }

    if (currentNoteId) {
      db.table("notes")
        .update(currentNoteId, data)
        .then(() => {
          const noteToUpdate = notes.find(note => note.id === currentNoteId)
          Object.assign(noteToUpdate, data)
          setNotes([
            noteToUpdate,
            ...notes.filter(note => note.id !== currentNoteId)
          ])
          setCurrentNote(data)
        })
    } else {
      db.table("notes")
        .add(data)
        .then(id => {
          data.id = id
          setCurrentNoteId(id)
          setNotes([data, ...notes])
          setCurrentNote(data)
        })
    }
  }

  function onClickNote(id) {
    db.table("notes")
      .get({ id })
      .then(note => {
        setCurrentNoteId(id)
        setCurrentNote(note)
      })
  }

  function wipeTable() {
    db.table("notes").clear()
  }

  function onNewNote() {
    setCurrentNoteId()
    setCurrentNote(DEFAULT_NOTE)
  }

  function onDeleteNote() {
    db.table("notes")
      .delete(currentNoteId)
      .then(() => {
        setNotes([...notes.filter(note => note.id !== currentNoteId)])
        setCurrentNoteId()
        setCurrentNote(DEFAULT_NOTE)
      })
  }

  return (
    <div className="App">
      <div className="App-layout">
        <div className="App-sidebar">
          <NoteList
            currentNoteId={currentNoteId}
            onClickNote={onClickNote}
            notes={notes}
          />
          <button onClick={wipeTable}>Wipe ALL Notes</button>
        </div>
        <div className="App-content">
          <Note
            currentNoteId={currentNoteId}
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
