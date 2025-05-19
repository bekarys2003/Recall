import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getNotes, createNote, deleteNote } from "../api";

function App() {
  const [notes, setNotes] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    getNotes().then(res => setNotes(res.data));
  }, []);

  function showToast(message, severity = "success") {
    setToast({ open: true, message, severity });
  }

  function addNote(newNote) {
    createNote(newNote).then(res => {
      setNotes(prev => [res.data, ...prev]);
      showToast("Note added");
    });
  }

  function removeNote(id) {
    deleteNote(id).then(() => {
      setNotes(prev => prev.filter(note => note.id !== id));
      showToast("Note deleted", "info");
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
      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <MuiAlert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default App;
