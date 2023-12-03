'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Select from 'react-select'

const ListaPacientes = () => {
    const [selectedPaciente, setSelectedPaciente] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [usersColletctionRef, setUsersColletctionRef] = useState(null);

    let cod_nutri;
    if (typeof window !== 'undefined') {
        cod_nutri = localStorage.getItem('cod_user');
    }

    const handleNewCodigo = async () => {
        const usersColletctionRef = collection(db, "codigos_paciente");
        const data = await getDocs(usersColletctionRef);
        const codigos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    }

    return (
        <div className='flex form-group '>
            <div className='form-group'>
                <button onClick={handleNewCodigo}>Gerar código de cadastro</button>
            </div>
        </div>
    )
}

export default ListaPacientes;
