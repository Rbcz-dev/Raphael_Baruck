"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Redireciona automaticamente para o index.html
    window.location.href = "/index.html";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Carregando site...</h2>
    </div>
  );
}