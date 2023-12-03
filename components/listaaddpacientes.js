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
    //console.log(cod_nutri)

    const fetchPacientes = async () => {
        const usersColletctionRef = collection(db, "user");
        setUsersColletctionRef(usersColletctionRef);
        const data = await getDocs(usersColletctionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Filter users based on the "paciente" property
        const filteredUsers = users.filter(user => user.paciente === true && !user.cod_nutri);

        setPacientes(filteredUsers);
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    const handlePacienteChange = (selectedOption) => {
        setSelectedPaciente(selectedOption);
    };

    const handleAddPaciente = async () => {
        if (usersColletctionRef && selectedPaciente) {
            console.log(selectedPaciente)
            const userDoc = doc(usersColletctionRef, selectedPaciente.value.id);
            await updateDoc(userDoc, { cod_nutri: cod_nutri });
        }
        alert("Paciente adicionado! Veja na página Seus Pacientes.");
    }

    return (
        <div className='flex form-group '>
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
                <button onClick={handleAddPaciente}>Adicionar</button>
            </div>
            <div className="flex absolute bottom-0 w-full text-center py-[50px]">
                <p className='text-s'>Se o paciente não for encontrado, certifique-se de que ele realizou o cadastro na Nootrino.</p>
            </div>
        </div>
    )
}

export default ListaPacientes;
