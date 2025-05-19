import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { getNotes, createNote, deleteNote } from "../api";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then(res => setNotes(res.data));
  }, []);

  function addNote(newNote) {
    createNote(newNote).then(res => {
      setNotes(prev => [res.data, ...prev]);
    });
  }

  function removeNote(id) {
    deleteNote(id).then(() => {
      setNotes(prev => prev.filter(note => note.id !== id));
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={removeNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
