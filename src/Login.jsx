import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setUsuarioLogueado }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

    

  return (
    <div className="login">
      <h1 className='titulo'>La cocina de {usuario || '...'}</h1>
      <form onSubmit={async (evento) => {
            evento.preventDefault();

            const respuesta = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contraseña }),
            credentials: 'include',
            });

            if (respuesta.ok) {
            const data = await respuesta.json();
            setUsuarioLogueado(usuario); // Aquí guardamos el usuario en el estado de la aplicación
            navigate("/recetas")
            } else {
            const errorData = await respuesta.json();
            setMensajeError(errorData.error || 'Credenciales incorrectas');
            }
            }}>
        <label>Usuario:</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          value={contraseña}
          onChange={(evento) => setContraseña(evento.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensajeError && <p className="loginError">{mensajeError}</p>}
    </div>
  );
}

export default Login;
