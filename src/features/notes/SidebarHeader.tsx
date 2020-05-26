import React from "react"
import NewNoteButton from "./NewNoteButton"
import SearchBar from "./SearchBar"

export default function SidebarHeader({
  createNewNote
}: {
  createNewNote: Function
}) {
  return (
    <header className="sidebar-header">
      <NewNoteButton createNewNote={createNewNote} />
      <SearchBar />
    </header>
  )
}
