import React, { useEffect, useState } from "react";

const Listado = () => {

    const [inputValue, setInputValue] = useState ('')
    const [tareas, setTareas] = useState("")
    const [listadoDeTareas, setListadoDeTareas] = useState(['Limpiar', 'Sacudir', 'Trapear'])
    
function cargarTareas (){
    fetch('https://playground.4geeks.com/todo/users/matias_sanhueza')
     .then((response)=> response.json())
     .then((data)=> setListadoDeTareas (data.todos))
}


    useEffect(()=>{
    cargarTareas()
      },[])

    function seEnvio (e){
        e.preventDefault()

       const nuevalista = [...listadoDeTareas, tareas]    
        setTareas('') 

        
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                "label": inputValue,
                "is_done": 'false'
        })
          };
        fetch('https://playground.4geeks.com/todo/todos/matias_sanhueza', requestOptions)
        .then(response => response.json())
            .then(data => {
                setInputValue("");
                cargarTareas();
            })
            .catch(error => console.error('Error al añadir la tarea:', error));
        
    }

    function eliminarTarea (indexToDelete){
        console.log('eliminar tarea', indexToDelete)
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch("https://playground.4geeks.com/todo/todos/"+indexToDelete, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                cargarTareas()
            }
        )

    }


    
    

    return (
        <>
        <form onSubmit={seEnvio} className="form-tarea">
            <input placeholder='ingresa tu tarea' type="text" name="tareas"  value={inputValue} onChange={(e) => setInputValue (e.target.value)} className="input-tarea"/>
        </form>

        
        {
            listadoDeTareas.map((tarea,index) =>
            <div className="btn-delete" key={index}>
                {tarea.label}
               <button onClick={() => eliminarTarea(tarea.id)}>
                   <svg xmlns="http://www.w3.org/2000/svg" 
                   width="16" 
                   height="16" 
                   fill="currentColor" 
                   className="bi bi-x" 
                   viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                   </svg>
                </button>
            </div>) 
        }
        
        </>
    )
} 

export default Listado