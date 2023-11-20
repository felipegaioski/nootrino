import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ShowAtendimentosPaciente = () => {
    const cod_user = localStorage.getItem('cod_user');
    const nome_nutri = localStorage.getItem('nome_nutri');
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
        <div>
            <div className='form-group'>
                {atendimentos.map((atendimento, index) => (
                    <div key={index}>
                        <p><b className='text-green'>Nutricionista:</b> {nome_nutri}</p>
                        <p><b className='text-green'>Data:</b> {formatDate(atendimento.data)}</p>
                        <p><b className='text-green'>Local:</b> {atendimento.local}</p>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowAtendimentosPaciente;
