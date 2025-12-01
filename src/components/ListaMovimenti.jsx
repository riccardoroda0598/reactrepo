import { useState, useContext, useEffect, useReducer, useCallback, useMemo, useRef } from "react";
import ContextMovimenti from "./ContextMovimenti"

const ListaMovimenti = () => {

    const {movimenti, dispatch} = useContext(ContextMovimenti);

    const totalEuros = useMemo(() => {
        const total = movimenti.reduce((acc, value) => {
            if(value.type == "expense") return acc-value.import;
            if(value.type == "income") return acc+value.import;
        },0)
        return total;
    },[movimenti])

    const handleDelete = (id) => {  
        console.log(id);      
        dispatch({type: 'ELIMINA', payload: id})        
    }

    const handleReset = () => {
        dispatch({type: 'RESET'})
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                Storico movimenti ( Totale: <span className={`${totalEuros > 0 ? 'text-green-500' : 'text-red-500'}`}>{`${totalEuros > 0 ? '+' : '-'}`}{totalEuros}</span> &euro; )
            </h2>
            
            
            <ul className="space-y-3">

                <button
                onClick={handleReset}
                className="flex items-center justify-center space-x-2 
                        py-2 px-4 rounded-lg text-sm font-semibold 
                        transition duration-300 ease-in-out 
                        bg-red-100 text-red-700 
                        hover:bg-red-200 hover:text-red-800 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 m-auto mb-3"
                aria-label="Resetta tutte le transazioni"
                >
                    {/* Icona SVG per il cestino/reset */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    
                    <span>Cancella tutto</span>
                </button>

                {movimenti.map((transaction, indice) => {
                    // Determina lo stile in base al tipo
                    const isIncome = transaction.type === 'income';
                    const sign = isIncome ? '+' : '-';
                    const colorClass = isIncome ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
                    const textColor = isIncome ? 'text-green-600' : 'text-red-600';

                    return (
                        <li 
                            key={transaction.id} 
                            // Contenitore della singola transazione
                            className={`p-4 flex items-center justify-between rounded-lg shadow-md border-l-4 ${colorClass}`}
                        >
                            {/* Descrizione e Dettagli */}
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-semibold truncate">
                                    {transaction.description}
                                </p>
                            </div>

                            {/* Importo e Bottone Elimina */}
                            <div className="flex items-center space-x-4">
                                <span className={`text-lg font-bold ${textColor}`}>
                                    { transaction.type === 'expense' ? '-' : '+'}{transaction.import} &euro;
                                </span>
                                
                                {/* Bottone Elimina */}
                                <button
                                    onClick={() => handleDelete(transaction.id)}
                                    className="text-gray-400 hover:text-red-600 transition duration-150 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    aria-label="Elimina transazione"
                                >
                                    {/* Icona SVG semplice per la 'X' */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ListaMovimenti;