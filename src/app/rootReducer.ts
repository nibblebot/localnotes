import { combineReducers } from "@reduxjs/toolkit"
import notesReducer from "../features/notes/notesSlice"

const rootReducer = combineReducers({
  notes: notesReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
