'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import Link from 'next/link';

const Lista = () => {
    const [pacientes, setPacientes] = useState([]);
    const [usersColletctionRef, setUsersColletctionRef] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPacientes = pacientes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let cod_nutri;
    if (typeof window !== 'undefined') {
        cod_nutri = localStorage.getItem('cod_user');
    }

    const fetchPacientes = async () => {
        const usersColletctionRef = collection(db, "user");
        setUsersColletctionRef(usersColletctionRef);
        const data = await getDocs(usersColletctionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Filter users based on the "paciente" property
        //const filteredUsers = users.filter(user => user.cod_nutri === cod_nutri);
        const filteredUsers = users.filter(user =>
            user.cod_nutri == cod_nutri &&
            user.nome.toLowerCase().includes(searchInput.toLowerCase())
        );

        const orderedUsers = filteredUsers.sort((a, b) => a.nome.localeCompare(b.nome));

        setPacientes(orderedUsers);
    };

    useEffect(() => {
        fetchPacientes();
    }, [searchInput]);

    return (
        <div>
            <div className='form-group'>
                <label>Pesquisar paciente</label>
                <input
                    type="text"
                    placeholder="Digite o nome do paciente"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <br></br>
            <div className='items-center justify-center flex-col w-full'>
                {currentPacientes.map((paciente, index) => (
                    <div key={index} className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                        <div className="flex items-center justify-between w-full h2-title font-bold">
                            <h3>{`${paciente.nome}`}</h3>
                            <div className="flex gap-20 font-medium">
                                <Link href={{
                                    pathname: `/dieta/`,
                                    query: { id: paciente.cod_user, nome: paciente.nome }
                                }}
                                    className="flex items-center">
                                    <BiSolidFoodMenu size={23} color="#00d46a" />
                                    <span>Editar dieta</span>
                                </Link>
                                <Link href={{
                                    pathname: `/medidas/`,
                                    query: { id: paciente.cod_user, nome: paciente.nome }
                                }} className="flex items-center">
                                    <FaEdit size={23} color="#00d46a" />
                                    <span>Editar medidas</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    <FaArrowLeft />
                </button>
                {Array.from({ length: Math.ceil(pacientes.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(pacientes.length / itemsPerPage)}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default Lista;
