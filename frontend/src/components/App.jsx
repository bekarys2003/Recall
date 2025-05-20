import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getNotes, createNote, deleteNote, updateNote } from "../api";

function App() {
  const [notes, setNotes] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const lightTheme = {
    bg: "#f9f9f9",
    white: "#ffffff",
    text: "#1c1c1e",
    gray: "#8e8e93",
    blue: "#007aff",
    lightBlue: "#dbeaff",
    shadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
    whiteBorder: "#f0f0f0",
  };

  const darkTheme = {
    bg: "#1c1c1e",
    white: "#2c2c2e",
    text: "#f5f5f7",
    gray: "#aaa",
    blue: "#0a84ff",
    lightBlue: "#1f3dff",
    shadow: "0 4px 16px rgba(255, 255, 255, 0.1)",
    whiteBorder: "#3a3a3a",
  };

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.text;
  }, [theme]);

  useEffect(() => {
    getNotes().then(res => setNotes(res.data));
  }, []);

  function toggleDarkMode() {
    setDarkMode(prev => !prev);
  }

  function showToast(message, severity = "success") {
    setToast({ open: true, message, severity });
  }

  function addNote(newNote) {
    createNote({ ...newNote, pinned: false }).then(res => {
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

  function togglePin(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    const updatedNote = { ...note, pinned: !note.pinned };

    updateNote(id, { pinned: updatedNote.pinned }).then(() => {
      setNotes(prev =>
        prev.map(n => (n.id === id ? updatedNote : n))
      );
      showToast(updatedNote.pinned ? "Note pinned 📌" : "Note unpinned", "info");
    });
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filteredNotes.filter(n => n.pinned);
  const others = filteredNotes.filter(n => !n.pinned);

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh", padding: "30px", color: theme.text }}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} theme={theme}/>
      <CreateArea onAdd={addNote} theme={theme} />
      <div style={{ maxWidth: "500px", margin: "0 auto 30px auto" }}>
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "1rem",
            borderRadius: "10px",
            border: `1px solid ${theme.gray}`,
            outline: "none",
            background: theme.white,
            color: theme.text,
            transition: "border 0.2s ease, background 0.2s ease",
          }}
        />
      </div>

      <div className="notes-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px", justifyContent: "flex-start" }}>
        {pinned.length > 0 && (
          <>
            <h4 style={{ width: "100%", margin: "10px 0 5px 10px", color: theme.gray }}>📌 Pinned</h4>
            {pinned.map((note) => (
              <Note key={note.id} {...note} onDelete={removeNote} onTogglePin={togglePin} theme={theme} />
            ))}
          </>
        )}

        {others.length > 0 && (
          <>
            {pinned.length > 0 && <div style={{ height: "30px" }} />}
            <h4 style={{ width: "100%", margin: "10px 0 5px 10px", color: theme.gray }}>🗒️ Notes</h4>
            {others.map((note) => (
              <Note key={note.id} {...note} onDelete={removeNote} onTogglePin={togglePin} theme={theme} />
            ))}
          </>
        )}
      </div>

      <Footer theme={theme}/>

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