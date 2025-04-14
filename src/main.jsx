import { StrictMode, useState } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";  // Usar Navigate en lugar de Redirect
import App from "./App";
import Login from "./Login";
import './index.css';

function Main() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null); // Estado en main.jsx

  // Configurar rutas con redirección condicional
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setUsuarioLogueado={setUsuarioLogueado} />,
    },
    {
      path: "/recetas",
      element: usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />,  // Usar Navigate para redirigir
    },
    {
      path: "/",
      element: usuarioLogueado ? <App usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} /> : <Navigate to="/login" />,  // Redirigir si no está logueado
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
