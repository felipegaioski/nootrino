import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ShowAtendimentosPaciente = () => {
    let cod_user;
    let nome_nutri;
    if (typeof window !== 'undefined') {
        cod_user = localStorage.getItem('cod_user');
        nome_nutri = localStorage.getItem('nome_nutri');
    }
    const [atendimentos, setAtendimentos] = useState([]);

    const fetchAtendimentos = async () => {
        const atendColletctionRef = collection(db, "atendimentos");
        const data = await getDocs(atendColletctionRef);
        const atends = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredAtends = atends.filter(atend => atend.cod_paciente == cod_user);
        setAtendimentos(filteredAtends);
    };

    useEffect(() => {
        fetchAtendimentos();
    }, []);

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
        return formattedDate;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border-b">Nutricionista</th>
                            <th className="border-b">Data</th>
                            <th className="border-b">Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {atendimentos.map((atendimento, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{nome_nutri}</td>
                                <td className="py-2 px-4 border-b">{formatDate(atendimento.data)}</td>
                                <td className="py-2 px-4 border-b">{atendimento.local}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ShowAtendimentosPaciente;
