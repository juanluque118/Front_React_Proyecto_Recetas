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
  //El nombre de usuario se pintará en el titulo de la pagina al mismo tiempo que se escribe en el input de usuario
  return (
    <div className="login">
      <h1 className='titulo'>La cocina de {usuario || '...'}</h1>
      <form onSubmit={async (evento) => {
        evento.preventDefault();

        // Cuando envía el formulario, hace un fetch al backend para intentar loguearse.
        
        const respuesta = await fetch('https://proyectorecetas.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //Aqui he hecho que el usuario lo envie al backend en minuscula para acceder mas rapido desde el movil ya que por defecto me va a escribir la primera en mayuscula
          body: JSON.stringify({ usuario: usuario.toLocaleLowerCase(), contraseña }),
          credentials: 'include'
        });

        //Si todo sale bien, guarda el usuario en el estado (setUsuarioLogueado) y redirige a /recetas.
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