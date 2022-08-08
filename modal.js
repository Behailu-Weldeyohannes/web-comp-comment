import CommentCard from "./comment-card/index.js";
window.customElements.define("comment-card", CommentCard);

// import { openDB, deleteDB, wrap, unwrap } from 'idb';


const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open("CommentDB", 1);

  DBOpenReq.addEventListener("error", (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });
  DBOpenReq.addEventListener("success", (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log("success", db);
  });
  DBOpenReq.addEventListener("upgradeneeded", (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log("DB updated from version", oldVersion, "to", newVersion);

    console.log("upgrade", db);
    if (!db.objectStoreNames.contains("CommentStore")) {
      objectStore = db.createObjectStore("commentStore", {
        keyPath: "id",
      });
    }
    // db.createObjectStore('foobar');
    if (db.objectStoreNames.contains("foobar")) {
      db.deleteObjectStore("foobar");
    }
  });

  document.commentForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked
  });
})();

export default IDB;
