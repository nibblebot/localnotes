import omit from "lodash/omit"
import reducer, {
  createDraftNote,
  createNote,
  initialState,
  deleteCurrentNote,
  selectNote,
  selectFirstNote,
  setError,
  setNotes,
  updateNote,
  fetchNotes,
  updateNoteDb,
  Note,
  createNoteDb,
  deleteCurrentNoteDb
} from "./notesSlice"

const testNote: Note = {
  id: "1",
  createdDate: new Date().toString(),
  modifiedDate: new Date().toString(),
  text: "Foobar<div>blah</div><br><div>bar</div>",
  title: "Foobar",
  preview: "blah"
}
const testNote2: Note = {
  id: "2",
  createdDate: new Date().toString(),
  modifiedDate: new Date().toString(),
  text: "Foobar2<div>blah</div><br><div>bar</div>",
  title: "Foobar2",
  preview: "blah"
}

const testNote2Updated: Note = {
  id: "2",
  createdDate: new Date().toString(),
  modifiedDate: new Date().toString(),
  text: "Foobar3<div>blah</div><br><div>bar</div>",
  title: "Foobar3",
  preview: "blah"
}
const oneNoteState = {
  ...initialState,
  notes: [testNote],
  currentNote: testNote
}
const twoNoteState = {
  ...initialState,
  notes: [testNote2, testNote],
  currentNote: testNote2
}

const twoNoteUpdatedState = {
  ...initialState,
  notes: [testNote2Updated, testNote],
  currentNote: testNote2Updated
}

const twoNoteStateNoneSelected = {
  ...initialState,
  notes: [testNote2, testNote]
}

const twoNoteStateOneSelected = {
  ...initialState,
  notes: [testNote2, testNote],
  currentNote: testNote
}

describe("Notes Reducer", () => {
  test("should create draft note", () => {
    const newDraftNote = reducer(initialState, {
      type: createDraftNote
    })

    expect(
      omit(newDraftNote.currentNote, "createdDate", "modifiedDate")
    ).toEqual(omit(initialState.currentNote, "createdDate", "modifiedDate"))
  })

  test("should create new note, prepend to list", () => {
    expect(
      reducer(initialState, {
        type: createNote,
        payload: testNote
      })
    ).toEqual(oneNoteState)

    expect(
      reducer(oneNoteState, {
        type: createNote,
        payload: testNote2
      })
    ).toEqual(twoNoteState)
  })

  test("should delete note", () => {
    expect(
      reducer(oneNoteState, {
        type: deleteCurrentNote
      })
    ).toEqual(initialState)
  })

  test("should select note", () => {
    expect(
      reducer(twoNoteState, {
        type: selectNote,
        payload: testNote
      })
    ).toEqual(twoNoteStateOneSelected)
  })

  test("should select first note", () => {
    expect(
      reducer(twoNoteStateOneSelected, {
        type: selectFirstNote
      })
    ).toEqual(twoNoteState)
  })

  test("should set notes", () => {
    expect(
      reducer(initialState, {
        type: setNotes,
        payload: [testNote2, testNote]
      })
    ).toEqual(twoNoteStateNoneSelected)
  })

  test("should update note", () => {
    expect(
      reducer(twoNoteState, {
        type: updateNote,
        payload: testNote2Updated
      })
    ).toEqual(twoNoteUpdatedState)
  })
})

describe("Notes thunks", () => {
  test("fetch notes succeeds", async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    await fetchNotes()(dispatch, getState, null)
    expect(dispatch).toHaveBeenCalledWith(setNotes([]))
  })
  test("update note succeeds", async () => {
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return {
        notes: oneNoteState
      }
    })
    await updateNoteDb(testNote)(dispatch, getState, null)
    expect(dispatch).toHaveBeenCalledWith(updateNote(testNote))
  })
  test("delete note succeeds", async () => {
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return {
        notes: oneNoteState
      }
    })
    await deleteCurrentNoteDb()(dispatch, getState, null)
    expect(dispatch).toHaveBeenCalledWith(deleteCurrentNote())
  })
})
