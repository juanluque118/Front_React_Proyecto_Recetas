import { useState, useEffect } from 'react';
import Crear from './Crear';
import Receta from './Receta';

function App({ usuarioLogueado, setUsuarioLogueado }) {
  const [recetas, setRecetas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

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
        <button className={`filtro ${categoriaSeleccionada == "todas" ? "activo" : ""}`} 
                onClick={() => setCategoriaSeleccionada("todas")}
        ><span className='letras'>Todas</span><span className="emoji">🍽️</span>
        </button>
        <button className={`filtro ${categoriaSeleccionada == "carne" ? "activo" : ""}`} 
                onClick={() => setCategoriaSeleccionada("carne")}
        ><span className='letras'>Carne</span><span className="emoji">🥩</span>
        </button>
        <button className={`filtro ${categoriaSeleccionada == "pescado" ? "activo" : ""}`} 
                onClick={() => setCategoriaSeleccionada("pescado")}
        ><span className='letras'>Pescado</span><span className="emoji">🐟</span>
        </button>
        <button className={`filtro ${categoriaSeleccionada == "vegetariano" ? "activo" : ""}`} 
                onClick={() => setCategoriaSeleccionada("vegetariano")}
        ><span className='letras'>Vegetariano</span><span className="emoji">🥦</span>
        </button>
        <button className={`filtro ${categoriaSeleccionada == "postres" ? "activo" : ""}`} 
                onClick={() => setCategoriaSeleccionada("postres")}
        ><span className='letras'>Postres</span><span className="emoji">🍪</span>
        </button>
      </div>

      <Crear crearReceta={crearReceta} visible={formVisible} setFormVisible={setFormVisible} />

      {cargando ? (
        <p className="cargando"> Cocinando...🍳</p>
      ) : (
        <section className="recetas">
          {recetas
            .filter(({ categoria }) =>
              categoriaSeleccionada == "todas" ? true : categoria.toLowerCase().includes(categoriaSeleccionada)
            )
            .sort((a, b) => a.receta.localeCompare(b.receta))
            .map(({ id, receta, ingredientes, elaboracion, img, categoria }) => (
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

          <button
            className="cerrarSesion"
            onClick={async () => {
              await fetch('http://localhost:4000/logout', { method: 'POST', credentials: 'include' });
              setUsuarioLogueado(null);
            }}
          >
            Cerrar sesión
          </button>
    </div>
  );
}

export default App;