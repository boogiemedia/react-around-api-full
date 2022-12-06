import React from "react";
export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__title">© {date} Around The U.S.</p>
    </footer>
  );
}
