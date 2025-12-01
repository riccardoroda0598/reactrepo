import { useState } from "react";
import { useContext } from "react";
import {ContextTest} from "./ToDoList";

function ToDoListTasks(props){
    
    const dati = useContext(ContextTest);
    const tasks = dati.tasks;
    const setTasks = dati.setTasks;
    
    const [filtro, setFiltro] = useState("all");
    const handleClick = (indice) => {
        if(!tasks[indice].isCompleted){
            const nuovoarray = tasks.map((elemento, indice2) => {
                if(indice === indice2){
                    elemento.isCompleted = true;                    
                }
                return elemento
            })

            setTasks(nuovoarray)
        }
    }

    const handleSetFiltro = (filtro) => {
        setFiltro(filtro);
    }

    return (
        <div className="mt-3">

            <div className="mb-3">
                <button 
                    type="button" 
                    className={`cursor-pointer py-1 px-2 font-medium text-white ${filtro === 'all' ? 'bg-blue-600' : 'bg-gray-400'}`} 
                    style={{borderRadius:"5px",}}  
                    onClick={() => handleSetFiltro("all")}                  
                >
                    all
                </button>
                <button 
                    type="button" 
                    className={`cursor-pointer py-1 px-2 ml-1 font-medium text-white ${filtro === 'pending' ? 'bg-blue-600' : 'bg-gray-400'}`} 
                    style={{borderRadius:"5px"}}       
                    onClick={() => handleSetFiltro("pending")}             
                >
                    pending
                </button>
                <button 
                    type="button" 
                    className={`cursor-pointer py-1 px-2 ml-1 font-medium text-white ${filtro === 'completed' ? 'bg-blue-600' : 'bg-gray-400'}`} 
                    style={{borderRadius:"5px"}}   
                    onClick={() => handleSetFiltro("completed")}                 
                >
                    completed
                </button>
            </div>

            {
                tasks.map((elemento, indice) => {
                    if(filtro === "completed" && !elemento.isCompleted) return;
                    if(filtro === "pending" && elemento.isCompleted) return;
                    return (
                        
                        <div 
                            key={indice} 
                            className={`${elemento.isCompleted ? 'bg-green-500' : 'bg-amber-300'} p-2`}
                            style={{ width: "300px", margin: "auto", marginBottom: "10px" }}
                            onClick={() => handleClick(indice)}
                            title={`${elemento.isCompleted ? 'completato' : 'pending'}`}
                        >
                            {elemento.name}
                        </div>
                        
                    )
                })
            }
        </div>
    );
}

export default ToDoListTasks;