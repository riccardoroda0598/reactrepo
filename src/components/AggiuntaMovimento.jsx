import { useState, useContext, useEffect, useReducer, useCallback, useMemo, useRef } from "react";
import ContextMovimenti from "./ContextMovimenti"

const AggiuntaMovimento = () => {

    const {movimenti, dispatch} = useContext(ContextMovimenti);

    const [formSetup, setFormSetup] = useState({
        description: "",
        import: 0,
        type: "expense"
    })
    
    const objForFocus = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({type: 'AGGIUNGI', payload: formSetup})
        setFormSetup({description: "", import: 0, type: "expense"})
        objForFocus.current.focus();
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                    Aggiungi movimentazione
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Descrizione
                        </label>
                        <input
                            ref={objForFocus}
                            type="text"
                            id="description"
                            placeholder="Metti una descrizione..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            value={formSetup.description}
                            onChange={(e) => setFormSetup({...formSetup, description: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Importo (&euro;)
                        </label>
                        <input
                            type="number"
                            id="import"
                            placeholder="Inserisci importo..."
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
                        Aggiungi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AggiuntaMovimento;