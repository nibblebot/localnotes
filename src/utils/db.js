import Dexie from "dexie"

const db = new Dexie("localnotes")
function createDatabase() {
  db.version(1).stores({ notes: "++id,date,title,preview,text" })
}

export function resetDatabase() {
  db.delete()
  createDatabase()
}

createDatabase()

export default db
