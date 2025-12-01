import { useContext } from "react";
import {ContextTest} from "./ToDoList";

function ToDoListTotals(){
    
    const dati = useContext(ContextTest);
    const tasks = dati.tasks;
    const setTasks = dati.setTasks;
    
    const completati = tasks.reduce( (prev, current) => {
        if(current.isCompleted){
            return prev + 1
        }else{
            return prev
        }
        
    },0)

    const totali = tasks.length;

    return (
        <div className="mt-3">
            <span className="text-blue-700 font-bold">Totali: { totali }</span>  - 
            <span className="text-green-700 font-bold">Completati: { completati }</span>  - 
            <span className="text-red-700 font-bold">Pending: { totali-completati }</span>  - 
            <span className="text-purple-800 font-bold">Done: { Math.floor((completati/totali)*100) }%</span>
        </div>
    );
    
}

export default ToDoListTotals;