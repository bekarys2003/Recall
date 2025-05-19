import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

function Note(props) {
  const [hovered, setHovered] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <motion.div
      className="note"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {hovered && (
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
      )}
    </motion.div>
  );
}

export default Note;
