import React from "react"

export default function NewNoteButton({
  createNewNote
}: {
  createNewNote: Function
}) {
  return (
    <i
      data-testid="new-note"
      className="fas fa-plus"
      onClick={() => createNewNote()}
    ></i>
  )
}
