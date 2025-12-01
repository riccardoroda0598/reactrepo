import { useReducer } from "react"
import ContextMovimenti from "./ContextMovimenti"

const funzioneReducer = (state, action) => {
    switch(action.type){
        case 'AGGIUNGI':
            console.log(action.payload)
            const valori = {
                id: state.length+1,
                description: action.payload.description,
                type: action.payload.type,
                import: parseFloat(action.payload.import)
            }
            return [...state, valori].reverse();
        case 'ELIMINA':
            return state.filter((movimento) => movimento.id != action.payload)
        case 'RESET':
            return []
    }
}
const ContentSpese = ({children}) => {
    
    const initialState = []
    
    const [movimenti, dispatch] = useReducer(funzioneReducer, initialState);

    return (
        <ContextMovimenti.Provider value={{movimenti, dispatch}}>
            {children}
        </ContextMovimenti.Provider>
    )
}

export default ContentSpese;