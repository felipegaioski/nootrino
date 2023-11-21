import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { TiDelete } from "react-icons/ti";

const ShowAtendimentos = ({ onAtendimentoCreated }) => {
    const cod_nutri = localStorage.getItem('cod_user');
    const [atendimentos, setAtendimentos] = useState([]);

    const fetchAtendimentos = async () => {
        const atendColletctionRef = collection(db, "atendimentos");
        const data = await getDocs(atendColletctionRef);
        const atends = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredAtends = atends.filter(atend => atend.cod_nutri === cod_nutri);
        setAtendimentos(filteredAtends);
    };

    const handleDelete = async (atendimentoId) => {
        try {
            await deleteDoc(doc(db, 'atendimentos', atendimentoId));
            fetchAtendimentos();
        } catch (error) {
            console.error("Error deleting atendimento: ", error);
        }
    };

    useEffect(() => {
        fetchAtendimentos();
    }, [onAtendimentoCreated]);

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
                            <th className="border-b">Paciente</th>
                            <th className="border-b">Data</th>
                            <th className="border-b">Local</th>
                            <th className="border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {atendimentos.map((atendimento, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{atendimento.paciente}</td>
                                <td className="py-2 px-4 border-b">{formatDate(atendimento.data)}</td>
                                <td className="py-2 px-4 border-b">{atendimento.local}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(atendimento.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ShowAtendimentos;
