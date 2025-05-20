import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea({ onAdd, theme }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  function submitNote(event) {
    if (!note.title.trim() && !note.content.trim()) {
      event.preventDefault();
      return;
    }
    onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form
        className="create-note"
        style={{
          background: theme.white,
          color: theme.text,
          border: `1px solid ${theme.whiteBorder}`,
          borderRadius: "14px",
          padding: "20px",
          width: "500px",
          margin: "0 auto 40px auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            style={{
              border: `1px solid ${theme.gray}`,
              background: theme.white,
              color: theme.text,
              padding: "12px 14px",
              borderRadius: "10px",
              fontSize: "1rem",
            }}
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          style={{
            border: `1px solid ${theme.gray}`,
            background: theme.white,
            color: theme.text,
            padding: "12px 14px",
            borderRadius: "10px",
            fontSize: "1rem",
          }}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={submitNote}
            sx={{
              position: "absolute",
              right: 16,
              bottom: -18,
              backgroundColor: theme.blue,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#005ecb",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
