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
                import: action.payload.import
            }
            return [...state, valori]
        case 'ELIMINA':
            console.log("PAYLOADDD")
            console.log(action.payload)
            console.log(state.filter((movimento) => movimento.id != action.payload))
            return state.filter((movimento) => movimento.id != action.payload)
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