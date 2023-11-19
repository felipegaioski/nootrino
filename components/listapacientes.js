'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Select from 'react-select'

const ListaPacientes = () => {
    const [selectedPaciente, setSelectedPaciente] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const fetchPacientes = async () => {
        const usersColletctionRef = collection(db, "user");
        const data = await getDocs(usersColletctionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Filter users based on the "paciente" property
        const filteredUsers = users.filter(user => user.paciente === true);

        setPacientes(filteredUsers);
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    const handlePacienteChange = (selectedOption) => {
        setSelectedPaciente(selectedOption);
    };

    const addPaciente = () => {

    }

    return (
        <div className='flex form-group '>
            {/* Food Selection */}
            <div className='form-group '>
                <h2 className='h2-title font-bold'>Selecione o paciente</h2>
                <Select
                    value={selectedPaciente}
                    onChange={handlePacienteChange}
                    options={pacientes.map((user) => ({ value: user, label: user.nome }))}
                    isSearchable
                />
            </div>
            <div className='form-group'>
                <button>Adicionar</button>
            </div>
            <div className="flex absolute bottom-0 w-full text-center py-[50px]">
                <p className='text-s'>Se o paciente não for encontrado, certifique-se de que ele realizou o cadastro na Nootrino.</p>
            </div>
        </div>
    )
}

export default ListaPacientes;
