import { useState, useEffect } from 'react'
import Crear from './Crear'
import Receta from './Receta'

function App() {

  let [recetas,setRecetas] = useState([])
  let [formVisible, setFormVisible] = useState(false)
  let [cargando,setCargando] = useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/recetas")
    .then(respuesta => respuesta.json())
    .then(recetas => {
      setRecetas(recetas)
      setCargando(false)
    })
  }, [])


  function crearReceta(receta){
    setRecetas([...recetas,receta])
  }

  function borrarReceta(id) {
    setRecetas(recetas.filter( receta => receta.id != id ))
  }

  function editarReceta(id, nuevaReceta) {
    setRecetas(recetas.map(receta => {
      if (receta.id == id) {
        return { ...receta, ...nuevaReceta };
      }
      return receta;
    }));
  }
 
  return (
    <>
    
    <h1 className="titulo">La cocina de ...</h1>
    <div className="filtros">
    <button className="botonCrear" onClick={ () => setFormVisible(!formVisible)}>+</button>
    <button className="filtro todas"><span>TODAS</span>🍽️</button>
    <button className="filtro carne"><span>Carne</span>🥩</button>
    <button className="filtro pescado"><span>Pescado</span>🐟</button>
    <button className="filtro vegetariano"><span>Vegetariano</span>🥦</button>
    <button className="filtro postres"><span>Postres</span>🍪</button>
  </div>

      <Crear crearReceta={crearReceta} visible={formVisible} setFormVisible={setFormVisible} />

    {
      cargando ? 
        <p className="cargando"> Cocinando...🍳</p>
        :
        <section className="recetas">
          { recetas.map(({id,receta,ingredientes,elaboracion,img,categoria}) => <Receta key={id} id={id} receta={receta} ingredientes={ingredientes} elaboracion={elaboracion} img={img} categoria={categoria} borrarReceta={borrarReceta} editarReceta={editarReceta}/> ) }
        </section>
    }
    </>
  )
}

export default App
