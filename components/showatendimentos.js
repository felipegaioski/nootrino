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
        <div>
            <div className='form-group'>
                {atendimentos.map((atendimento, index) => (
                    <div key={index}>
                        <p><b>Paciente:</b> {atendimento.paciente}</p>
                        <p><b>Data:</b> {formatDate(atendimento.data)}</p>
                        <p><b>Local:</b> {atendimento.local}</p>
                        <button onClick={() => handleDelete(atendimento.id)}><TiDelete size={25} color="white" />Excluir</button>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowAtendimentos;
