import { useState, useContext, useEffect, useReducer, useCallback } from "react";
import ContextMovimenti from "./ContextMovimenti"

const ReducerTest = () => {
    const {movimenti, dispatch} = useContext(ContextMovimenti);

    const [formSetup, setFormSetup] = useState({
        description: "",
        import: 0,
        type: ""
    })
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formSetup)
        dispatch({type: 'AGGIUNGI', payload: formSetup})
    }

    const handleDelete = (id) => {  
        console.log(id);      
        dispatch({type: 'ELIMINA', payload: id})
    }

    console.log(movimenti)

    return (
        <>

        <div className="max-w-md mx-auto mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                    Aggiungi Nuova Transazione
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Descrizione
                        </label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Es: Benzina, Stipendio, Affitto"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            value={formSetup.description}
                            onChange={(e) => setFormSetup({...formSetup, description: e.target.value})}
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Importo (€)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            min="0.01"
                            step="0.01"
                            value={formSetup.import}
                            onChange={(e) => setFormSetup({...formSetup, import: e.target.value})}
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo
                        </label>
                        <select
                            id="type"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            value={formSetup.type}
                            onChange={(e) => setFormSetup({...formSetup, type: e.target.value})}
                        >
                            <option value="expense">🔴 Uscita (Spesa)</option>
                            <option value="income">🟢 Entrata (Guadagno)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-300 ease-in-out 
                                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Aggiungi Transazione
                    </button>
                </form>
            </div>
        </div>

        {
            movimenti.length > 0 && (

                <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Storico Transazioni
                </h2>
                
                <ul className="space-y-3">
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
                                    <p className="text-sm text-gray-500">
                                        ID: {transaction.id}
                                    </p>
                                </div>

                                {/* Importo e Bottone Elimina */}
                                <div className="flex items-center space-x-4">
                                    <span className={`text-lg font-bold ${textColor}`}>
                                        {transaction.import}
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
        </>
    )

}

export default ReducerTest;