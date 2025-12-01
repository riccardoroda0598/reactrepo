import { useState } from "react";
import { useContext } from "react";
import {ContextTest} from "./ToDoList";

function ToDoListAddNew(){

    const dati = useContext(ContextTest);
    const tasks = dati.tasks;
    const setTasks = dati.setTasks;

    const [NewTodo, setNewToDo] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (evento) => {
        setNewToDo(evento.target.value)
        setError("")
        if(evento.target.value.length > 5){
            setEnableSubmit(true);
        }else{
            setEnableSubmit(false);
        }
    };

    const handleBlur = () => {
        if(!enableSubmit){
            setError("Controlla i campi...")
        }
    }

    const handleSubmit = (evento) => {     
        evento.preventDefault();  
        setTasks([...tasks,{name: NewTodo, isCompleted: false}])
    };

    return (
        <div className="mt-3">
            <form onSubmit={handleSubmit}>
                <input 
                    className="p-1"
                    style={{border: "1px solid gray", borderRadius: "5px"}}
                    type="text"
                    placeholder="Add a new todo..." 
                    value={NewTodo}
                    onChange={handleChange}   
                    onBlur={handleBlur}            
                />                
                <button 
                    type="submit" 
                    disabled={!enableSubmit}
                    className="p-1 ml-1" 
                    style={{backgroundColor: "gainsboro", width:"50px", borderRadius:"5px"}}                    
                >
                    ADD
                </button>
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </div>
    )
}

export default ToDoListAddNew;