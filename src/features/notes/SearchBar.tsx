import React, { useState } from "react"
import { useDispatch } from "react-redux"
import "./SearchBar.css"
import { searchNotes } from "./notesSlice"
export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
    dispatch(searchNotes(event.target.value))
  }
  return (
    <>
      <i className="fas fa-search"></i>
      <input
        className="search-input"
        type="search"
        value={searchValue}
        onChange={handleSearch}
      />
    </>
  )
}
