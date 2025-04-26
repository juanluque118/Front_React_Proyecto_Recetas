import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import './index.css';

function Main() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al arrancar, consultamos al servidor si ya hay un usuario logueado
  useEffect(() => {
    fetch('https://proyectorecetas.onrender.com/usuario', { credentials: 'include' })
      .then(respuesta => respuesta.ok ? respuesta.json() : null)
      .then(data => {
        // Si hay sesión activa, guarda el usuario.
        if (data?.usuario) {
          setUsuarioLogueado(data.usuario);
        }
      })
      .finally(() => setCargando(false));
  }, []);
  

  if (cargando) return <p className="abriendoCocina">🔑 ...Abriendo cocina... 🚪</p>;

  // Si el usuario está logueado, carga la app (App.jsx).
  // Si no, lo manda al login (Login.jsx).
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} usuarioLogueado={usuarioLogueado} />} />

          <Route path="/recetas" element={usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />} />

          <Route path="/" element={usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />} />

        </Routes>
      </Router>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);