import Dexie from "dexie"

const db = new Dexie("localnotes")
function createDatabase() {
  db.version(1).stores({ notes: "++id,date,title,preview,text,*textWords" })

  // Add hooks that will index "message" for full-text search:
  db.notes.hook("creating", function(primKey, obj, trans) {
    if (typeof obj.text == "string") obj.textWords = getAllWords(obj.text)
  })
  db.notes.hook("updating", function(mods, primKey, obj, trans) {
    if (mods.hasOwnProperty("text")) {
      // "message" property is being updated
      if (typeof mods.text == "string")
        // "message" property was updated to another valid value. Re-index messageWords:
        return { textWords: getAllWords(mods.text) }
      // "message" property was deleted (typeof mods.message === 'undefined') or changed to an unknown type. Remove indexes:
      else return { textWords: [] }
    }
  })
  function getAllWords(text) {
    /// <param name="text" type="String"></param>
    var allWordsIncludingDups = text
      .replace("<div>", " ")
      .replace("</div>", " ")
      .replace("<br>", " ")
      .split(" ")
    var wordSet = allWordsIncludingDups.reduce(function(prev, current) {
      prev[current] = true
      return prev
    }, {})
    return Object.keys(wordSet)
  }
}

export function resetDatabase() {
  db.delete()
  createDatabase()
}

createDatabase()

window.db = db

export default db
