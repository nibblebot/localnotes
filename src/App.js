import React, { useState, useEffect } from "react";
import "./App.css";
import NoteList from "./NoteList";
import Note from "./Note";
import db from "./db";

function App() {
  const [currentNoteId, setCurrentNoteId] = useState();
  const [currentNote, setCurrentNote] = useState({ text: "" });

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    db.table("notes")
      .toCollection()
      .reverse()
      .sortBy("date")
      .then(notes => {
        setNotes(notes);
      });
  }, []);

  function onSaveNote(value) {
    const matches = value.match(/(.*)\n(.*)/);
    const data = {};

    data.date = new Date();
    data.text = value;

    if (!matches) {
      data.title = value;
      data.preview = null;
    } else {
      data.title = matches[1];
      data.preview = matches[2];
    }

    if (currentNoteId) {
      db.table("notes")
        .update(currentNoteId, data)
        .then(() => {
          const noteToUpdate = notes.find(note => note.id === currentNoteId);
          Object.assign(noteToUpdate, data);
          setNotes([
            noteToUpdate,
            ...notes.filter(note => note.id !== currentNoteId)
          ]);
          setCurrentNote(data);
        });
    } else {
      db.table("notes")
        .add(data)
        .then(id => {
          data.id = id;
          setCurrentNoteId(id);
          setNotes([data, ...notes]);
          setCurrentNote(data);
        });
    }
  }

  function onClickNote(id) {
    db.table("notes")
      .get({ id })
      .then(note => {
        setCurrentNoteId(id);
        setCurrentNote(note);
      });
  }

  function wipeTable() {
    db.table("notes").clear();
  }
  return (
    <div className="App">
      <div className="App-layout">
        <div className="App-sidebar">
          <NoteList onClickNote={onClickNote} notes={notes} />
          <button onClick={wipeTable}>Wipe ALL Notes</button>
        </div>
        <div className="App-content">
          <Note onSave={onSaveNote} noteText={currentNote.text} />
        </div>
      </div>
    </div>
  );
}

export default App;
