import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUsuarioLogueado, usuarioLogueado }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioLogueado) {
      navigate('/recetas');
    }
  }, [usuarioLogueado]);

  return (
    <div className="login">
      <h1 className='titulo'>La cocina de {usuario || '...'}</h1>
      <form onSubmit={async (evento) => {
        evento.preventDefault();

        const respuesta = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, contraseña }),
          credentials: 'include'
        });

        if (respuesta.ok) {
          setUsuarioLogueado(usuario);
          navigate('/recetas');
        } else {
          const data = await respuesta.json();
          setMensajeError(data.error || 'Error en login');
        }
      }}>
        <label>Usuario:</label>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensajeError && <p className="loginError">{mensajeError}</p>}
    </div>
  );
}

export default Login;
