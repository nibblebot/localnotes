import { configureStore, Action } from "@reduxjs/toolkit"
import { ThunkAction, ThunkDispatch as Dispatch } from "redux-thunk"

import rootReducer, { RootState } from "./rootReducer"

export type AppThunk<R> = ThunkAction<R, RootState, unknown, Action<string>>
export type ThunkDispatch = Dispatch<RootState, null, Action>

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store
