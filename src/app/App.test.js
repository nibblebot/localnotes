import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"

test("renders App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
