import { useState, useContext, useEffect, useReducer, useCallback, useMemo, useRef } from "react";
import ContextMovimenti from "./ContextMovimenti"
import ListaMovimenti from "./ListaMovimenti"
import AggiuntaMovimento from "./AggiuntaMovimento";

const GestioneSpese = () => {    

    const {movimenti, dispatch} = useContext(ContextMovimenti);

    return (
        <>

        <AggiuntaMovimento />

        {
            movimenti.length > 0 && <ListaMovimenti />
        }
        </>
    )

}

export default GestioneSpese;