import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import './index.css';

function Main() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/usuario', { credentials: 'include' })
      .then(respuesta => respuesta.ok ? respuesta.json() : null)
      .then(data => {
        if (data?.usuario) {
          setUsuarioLogueado(data.usuario);
        }
      })
      .finally(() => setCargando(false));
  }, []);
  

  if (cargando) return <p style={{ textAlign: "center" }}>Cargando sesión...</p>;

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} usuarioLogueado={usuarioLogueado} />} />

          <Route path="/recetas" element={usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />} />

          <Route path="/" element={usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);

