import { useState, useEffect, useRef, createContext, useContext } from "react";
import ToDoListTotals from "./ToDoListTotals";
import ToDoListAddNew from "./ToDoListAddNew";
import ToDoListTasks from "./ToDoListTasks";

export const ContextTest = createContext(null);

function ToDoList(){

    const [tasks, setTasks] = useState([
    {
        name : "Scongelare brodo",
        isCompleted : true
    },
    {
        name : "Fare la doccia",
        isCompleted : false
    },
    {
        name : "Fare la barba",
        isCompleted : false
    },
    {
        name : "Preparare lo zaino",
        isCompleted : false
    }
]);

    return (
        <ContextTest.Provider value={{tasks, setTasks}}>
            
            <ToDoListTotals />
            <ToDoListAddNew />
            <ToDoListTasks/>
            
        </ContextTest.Provider>        
    );


}

export default ToDoList;