import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import PushPinIcon from "@mui/icons-material/PushPin";

function Note(props) {
  const [hovered, setHovered] = useState(false);
  const theme = props.theme;
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <motion.div
      className="note"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      style={{
        background: theme.white,
        color: theme.text,
        borderRadius: "14px",
        padding: "20px",
        width: "300px",
        margin: "20px 0",
        border: `1px solid ${theme.whiteBorder}`,
        position: "relative",
        transition: "background-color 0.4s ease, color 0.4s ease, border 0.4s ease"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    <h1 style={{ color: theme.text }}>{props.title}</h1>
    <p style={{ color: theme.text }}>{props.content}</p>
      {hovered && (
        <>
          <button
            onClick={() => props.onTogglePin(props.id)}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: props.pinned ? "#007aff" : "#ccc",
            }}
            title={props.pinned ? "Unpin" : "Pin"}
          >
            <PushPinIcon />
          </button>

          <button
            onClick={() => props.onDelete(props.id)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ff3b30",
            }}
            title="Delete"
          >
            <DeleteIcon />
          </button>
        </>
      )}



    </motion.div>
  );
}

export default Note;
