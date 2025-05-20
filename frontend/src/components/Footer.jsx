import React from "react";

function Footer({ theme }) {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "60px",
        color: theme.gray,
        fontSize: "0.85rem",
        paddingTop: "20px",
        borderTop: `1px solid ${theme.whiteBorder}`,
        opacity: 0.8,
      }}
    >
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
