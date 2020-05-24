import Dexie from "dexie"

const db = new Dexie("localnotes")
db.version(1).stores({ notes: "++id,date,title,preview,text" })

window.db = db

export default db
