import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import db from "utils/db"

export interface Note {
  id?: string
  createdDate?: string
  modifiedDate: string
  text: string
  title: string
  preview: string
}

interface NotesState {
  currentNote: Note
  notes: Note[]
  error: string | null
}

export const draftNote = () => {
  return {
    createdDate: new Date().toString(),
    modifiedDate: new Date().toString(),
    text: "",
    title: "",
    preview: ""
  }
}

export const initialState: NotesState = {
  currentNote: draftNote(),
  notes: [],
  error: null
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createDraftNote: state => {
      state.currentNote = draftNote()
    },
    createNote: (state, { payload }: PayloadAction<Note>) => {
      state.currentNote = payload
      state.notes.unshift(payload)
    },
    deleteCurrentNote: state => {
      const noteToDeleteIndex = state.notes.findIndex(
        note => note.id === state.currentNote.id
      )
      if (noteToDeleteIndex !== -1) {
        state.notes.splice(noteToDeleteIndex, 1)
        state.currentNote = draftNote()
      }
    },
    selectNote: (state, { payload }: PayloadAction<Note>) => {
      state.currentNote = payload
    },
    selectFirstNote: state => {
      state.currentNote = state.notes[0]
    },
    setNotes: (state, { payload }: PayloadAction<Note[]>) => {
      state.notes = payload
    },
    updateNote: (state, { payload }: PayloadAction<Note>) => {
      const noteIndex = state.notes.findIndex(note => note.id === payload.id)
      if (noteIndex !== -1) {
        state.notes[noteIndex] = payload
        state.currentNote = payload
      }
    },
    setError: (state, { payload }) => {
      state.error = payload
    }
  }
})

export const {
  createDraftNote,
  createNote,
  deleteCurrentNote,
  selectNote,
  selectFirstNote,
  updateNote,
  setNotes,
  setError
} = notesSlice.actions

export default notesSlice.reducer

export const fetchNotes = (): AppThunk<Promise<any>> => async dispatch => {
  try {
    const notes = await db
      .table("notes")
      .toCollection()
      .reverse()
      .sortBy("createdDate")

    dispatch(setNotes(notes))
    if (notes.length) {
      dispatch(selectFirstNote())
    }
    return Promise.resolve()
  } catch (err) {
    dispatch(setError("Failed to fetch Notes"))
    return Promise.reject()
  }
}

export const updateNoteDb = (data: Note): AppThunk<void> => async (
  dispatch,
  getState
) => {
  const { currentNote } = getState().notes
  try {
    await db.table("notes").update(currentNote.id, data)
    const newNote = { ...data, id: currentNote.id }
    dispatch(updateNote(newNote))
  } catch (err) {
    dispatch(setError("Update Note Failed"))
  }
}

export const createNoteDb = (data: Note): AppThunk<void> => async dispatch => {
  try {
    const noteId = await db.table("notes").add(data)
    const newNote = { ...data, id: noteId }
    dispatch(createNote(newNote))
  } catch (err) {
    dispatch(setError("Create Note Failed"))
  }
}

export const deleteCurrentNoteDb = (): AppThunk<Promise<any>> => async (
  dispatch,
  getState
) => {
  const { currentNote } = getState().notes
  try {
    await db.table("notes").delete(currentNote.id)
    dispatch(deleteCurrentNote())
  } catch (err) {
    dispatch(setError("Delete Note Failed"))
  }
}
