import { useEffect, useState } from 'react'

function Receta({id,receta,ingredientes,elaboracion,img,categoria,borrarReceta,editarReceta}) {

    let [editando,setEditando] = useState(false)
    let [recetaTemporal,setRecetaTemporal] = useState(receta)
    let [ingredientesTemporal,setIngredientesTemporal] = useState(ingredientes)
    let [elaboracionTemporal,setElaboracionTemporal] = useState(elaboracion)
    let [imgTemporal,setImgTemporal] = useState("/ensalada mediterranea.png")
    let [categoriaTemporal,setCategoriaTemporal] = useState(categoria)
    let [msgError,setMsgError] = useState("")
    let [error,setError] = useState(false)
 
  return (
    
    <div className="receta">
        <h2 className={ !editando ? "visible" : "" }>{ receta }</h2>
        <input className={ editando ? "visible" : "" } placeholder='Titulo de la receta' type="text" value={recetaTemporal} onChange={ evento => setRecetaTemporal(evento.target.value) } required />

        <h3>Ingredientes:</h3>
        <p className={ !editando ? "visible" : "" }>{ ingredientes }</p>
        <textarea className={ editando ? "visible" : "" } name="ingredientes" rows="4" value={ingredientesTemporal} onChange={ evento => setIngredientesTemporal(evento.target.value) } required></textarea>

        <h3>Elaboración:</h3>
        <p className={ !editando ? "visible" : "" }>{ elaboracion }</p>
        <textarea className={ editando ? "visible" : "" } name="elaboracion" rows="5" value={elaboracionTemporal} onChange={ evento => setElaboracionTemporal(evento.target.value) } required></textarea>

        <img src= { img } alt="Imagen de receta" />
        <input className={ editando ? "visible" : "" } type="file" name="imagen" accept="image/*" />

        <p className= { !editando ? "categoria visible" : "categoria" }><strong>Categoría: </strong>{ categoria }</p>
        <select className={ editando ? "visible" : "" } name="categoria" value={categoriaTemporal} onChange={ evento => setCategoriaTemporal(evento.target.value) } required>
                <option value="">-- Selecciona una categoría --</option>
                <option value="🥩Carne">🥩Carne</option>
                <option value="🐟Pescado">🐟Pescado</option>
                <option value="🥦Vegetariano">🥦Vegetariano</option>
                <option value="🍪Postres">🍪Postres</option>
        </select>

        <div className="botones">
            <button className="boton editar" onClick={ async () => {
                if((recetaTemporal.trim() != "" && recetaTemporal.trim() != receta) || (ingredientesTemporal.trim() !== "" && ingredientesTemporal.trim() != ingredientes) || (elaboracionTemporal.trim() !== "" && elaboracionTemporal.trim() != elaboracion) || (categoriaTemporal != categoria)){
                    
                    let {status} = await fetch("http://localhost:4000/recetas/editar/texto/" + id,{
                        method : "PUT",
                        body : JSON.stringify({
                          receta : recetaTemporal.trim(),
                          ingredientes: ingredientesTemporal,
                          elaboracion: elaboracionTemporal,
                          img: imgTemporal,
                          categoria: categoriaTemporal
                        }),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    })
                    if(status == 204){
                        editarReceta(id,{
                        receta : recetaTemporal.trim(),
                        ingredientes: ingredientesTemporal,
                        elaboracion: elaboracionTemporal,
                        img: imgTemporal,
                        categoria: categoriaTemporal
                        })
                        setRecetaTemporal(recetaTemporal.trim())
                        setError(false)
                        

                    }else{ 
                        setMsgError("No se pudo editar")
                        setError(true)  
                    }

                }
                if(recetaTemporal== ""){
                    setRecetaTemporal(receta)
                }
                if(ingredientesTemporal== ""){
                    setIngredientesTemporal(ingredientes)
                }
                if(elaboracionTemporal== ""){
                    setElaboracionTemporal(elaboracion)
                }
                
                setEditando(!editando)
            }} >
                { editando ? <i className="fas fa-save"></i> : <i className="fas fa-edit"></i> }
            </button>
            <button className="boton borrar" onClick={ () => {
                fetch("http://localhost:4000/recetas/borrar/" + id,{
                    method : "DELETE"
                })
                .then(({status}) => {
                    if(status == 204){
                        return borrarReceta(id)
                    }
                    setMsgError("No se pudo borrar")
                    setError(true)
                })
            } }>
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
        <p className={ `error ${error ? "visible" : "" }` }>{ msgError }</p>
    </div>
  )
}

export default Receta
