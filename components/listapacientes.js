'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import Link from 'next/link';

const Lista = () => {
    const [pacientes, setPacientes] = useState([]);
    const [usersColletctionRef, setUsersColletctionRef] = useState(null);

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
        const filteredUsers = users.filter(user => user.cod_nutri === cod_nutri);

        setPacientes(filteredUsers);
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    return (
        <div>
            <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                <h2 className='h2-title'>Seus Pacientes</h2>
            </div>
            <div className='items-center justify-center flex-col w-full'>
                {pacientes.map((paciente, index) => (
                    <div key={index} className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                        <div className="flex items-center justify-between w-full h2-title font-bold">
                            <h3>{`${paciente.nome}`}</h3>
                            <div className="flex gap-20 font-medium">
                                <Link href={{
                                    pathname: `/dieta/`,
                                    query: { id: paciente.cod_user }
                                }}
                                    className="flex items-center">
                                    <BiSolidFoodMenu size={23} color="#00d46a" />
                                    <span>Editar dieta</span>
                                </Link>
                                <Link href={{
                                    pathname: `/medidas/`,
                                    query: { id: paciente.cod_user }
                                }} className="flex items-center">
                                    <FaEdit size={23} color="#00d46a" />
                                    <span>Editar medidas</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Lista;
