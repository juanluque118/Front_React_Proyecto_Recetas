import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Crear from './Crear';
import Receta from './Receta';

function App({ usuarioLogueado, setUsuarioLogueado }) {
  const [recetas, setRecetas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuarioLogueado) {
      fetch("http://localhost:4000/recetas", {credentials : 'include'})
        .then((respuesta) => respuesta.json())
        .then((recetas) => {
          setRecetas(recetas);
          setCargando(false);
        });
    }
  }, [usuarioLogueado]);

  function crearReceta(receta) {
    setRecetas([...recetas, receta]);
  }

  function borrarReceta(id) {
    setRecetas(recetas.filter((receta) => receta.id !== id));
  }

  function editarReceta(id, nuevaReceta) {
    setRecetas(
      recetas.map((receta) => {
        if (receta.id === id) {
          return { ...receta, ...nuevaReceta };
        }
        return receta;
      })
    );
  }

  return (
    <div>
      <h1 className="titulo">La cocina de {usuarioLogueado}</h1>
      <div className="filtros">
        <button className="botonCrear" onClick={() => setFormVisible(!formVisible)}>
          +
        </button>
        <button className="filtro todas">
          <span>TODAS</span>🍽️
        </button>
        <button className="filtro carne">
          <span>Carne</span>🥩
        </button>
        <button className="filtro pescado">
          <span>Pescado</span>🐟
        </button>
        <button className="filtro vegetariano">
          <span>Vegetariano</span>🥦
        </button>
        <button className="filtro postres">
          <span>Postres</span>🍪
        </button>
      </div>

      <Crear crearReceta={crearReceta} visible={formVisible} setFormVisible={setFormVisible} />

      {cargando ? (
        <p className="cargando"> Cocinando...🍳</p>
      ) : (
        <section className="recetas">
          {recetas.map(({ id, receta, ingredientes, elaboracion, img, categoria }) => (
            <Receta
              key={id}
              id={id}
              receta={receta}
              ingredientes={ingredientes}
              elaboracion={elaboracion}
              img={img}
              categoria={categoria}
              borrarReceta={borrarReceta}
              editarReceta={editarReceta}
            />
          ))}
        </section>
      )}

      <Link to="/login" className="cerrarSesion" onClick={() => setUsuarioLogueado(null)}>Cerrar sesión</Link>
    </div>
  );
}

export default App;
