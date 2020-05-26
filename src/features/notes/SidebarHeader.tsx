import React from "react"
interface Props {
  onNewNote: Function
}
export default function SidebarHeader({ onNewNote }: Props) {
  return (
    <header className="sidebar-header">
      <i className="fas fa-plus" onClick={() => onNewNote()}></i>
    </header>
  )
}
