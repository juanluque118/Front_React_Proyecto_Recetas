import { useState } from 'react'

function Crear({crearReceta,visible, setFormVisible}) {

    let [textoInput,setTextoInput] = useState("")
    let [textoIngredientes,setTextoIngredientes] = useState("")
    let [textoElaboracion,setTextoElaboracion] = useState("")
    let [categoria,setCategoria] = useState("")
    let [msgError,setMsgError] = useState("No se ha podido crear la receta. Vuelve a intentarlo")
    let [error,setError] = useState(false)
 
  return (
    <>
       
        <form className={`formReceta ${visible ? "visible" : ""}`} onSubmit={ evento => {
            evento.preventDefault()

            if(textoInput.trim() != ""){
                
                fetch("http://localhost:4000/recetas/nueva",{
                    method : "POST",
                    body : JSON.stringify({receta: textoInput.trim(), ingredientes: textoIngredientes.trim(), elaboracion:textoElaboracion.trim(), img:"/ensalada mediterranea.png", categoria: categoria}),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id,error}) => {
                    if(!error){
                        crearReceta({id, receta: textoInput.trim(), ingredientes: textoIngredientes.trim(), elaboracion:textoElaboracion.trim(), img:"/ensalada mediterranea.png", categoria: categoria })
                        
                        setTextoInput("")
                        setTextoIngredientes("")
                        setTextoElaboracion("")
                        setCategoria("")
                        setError(false)
                        return setFormVisible(false)
                    }
                    setMsgError("Ha ocurrido un error")
                    setError(true)
                    
                })
                .catch(() => {
                    setMsgError("Error en el servidor. Intentalo más tarde")
                    setError(true)
                });
            }
        }}>
            <h1 className="nuevaReceta">Nueva Receta 🍅</h1>
            <label>Título:</label>
            <input type="text" name="titulo" value={textoInput} onChange={ evento => setTextoInput(evento.target.value)} required />

            <label>Ingredientes:</label>
            <textarea name="ingredientes" value={textoIngredientes} onChange={ evento => setTextoIngredientes(evento.target.value)} rows="4" required></textarea>

            <label>Elaboración:</label>
            <textarea name="elaboracion" value={textoElaboracion} onChange={ evento => setTextoElaboracion(evento.target.value)} rows="5" required></textarea>

            <label>Imagen:</label>
            <input type="file" name="imagen" accept="image/*" />

            <label>Categoría:</label>
            <select name="categoria" value={categoria} onChange={ evento => setCategoria(evento.target.value)} required>
                <option value="">-- Selecciona una categoría --</option>
                <option value="🥩Carne">🥩Carne</option>
                <option value="🐟Pescado">🐟Pescado</option>
                <option value="🥦Vegetariano">🥦Vegetariano</option>
                <option value="🍪Postres">🍪Postres</option>
            </select>

            

            <button type="submit">Guardar Receta</button>
            <p className={ `error ${error ? "visible" : "" }` }>{ msgError }</p>
        </form>
    </>
  )
}

export default Crear
