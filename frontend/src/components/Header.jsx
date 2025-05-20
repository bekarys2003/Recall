import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Header({ darkMode, toggleDarkMode, theme }) {
  return (
    <header
      style={{
        background: theme.white,
        padding: "24px 40px",
        borderRadius: "14px",
        textAlign: "left",
        marginBottom: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: theme.text,
        }}
      >
        <MenuBookIcon />
        Recall
      </h1>
      <button
        onClick={toggleDarkMode}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {darkMode ? (
          <LightModeIcon style={{ color: theme.text }} />
        ) : (
          <DarkModeIcon style={{ color: theme.text }} />
        )}
      </button>
    </header>
  );
}

export default Header;
