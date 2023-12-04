'use client'
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { MdContentCopy } from "react-icons/md";

const AddPacientes = () => {
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [showCodigo, setShowCodigo] = useState(false);
    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const [codeExists, setCodeExists] = useState(false);

    let cod_nutri;
    let nome;
    if (typeof window !== 'undefined') {
        cod_nutri = localStorage.getItem('cod_user');
        nome = localStorage.getItem('nome');
    }

    const handleNewCodigo = async () => {
        if (!email) {
            alert("Por favor, insira um endereço de e-mail válido.");
            return;
        }
        if (!isEmailValid(email)) {
            alert("Por favor, insira um endereço de e-mail válido.");
            return;
        }

        const codCollectionRef = collection(db, "codigos_paciente");
        const data = await getDocs(codCollectionRef);
        const codigos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        let foundEmail = false;
        codigos.map(cod => {
            if (cod.email === email) {
                foundEmail = true;
                setCodeExists(true);
                setCodigo(cod.id);
                setEmail(email);
                setShowCodigo(true);
                setShowCopyPopup(false);
                return;
            }
        })

        if (!foundEmail) {
            const dados = {
                email: email,
                cod_nutri: Number(cod_nutri),
                used: false,
                nome_nutri: nome
            };
            const docRef = await addDoc(codCollectionRef, dados);
            setCodigo(docRef.id);
            setShowCodigo(true);

            // Show the copy popup

            // Hide the copy popup after 3 seconds
            // setTimeout(() => {
            //     setShowCopyPopup(false);
            // }, 3000);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setShowCopyPopup(false);
        setShowCodigo(false);
        setCodeExists(false);
    };

    const isEmailValid = (email) => {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className='flex form-group '>
            <div className="form-group">
                <label>Email do paciente</label>
                <input
                    type="email"
                    placeholder="Email do paciente"
                    onChange={(event) => { handleEmail(event) }}
                />
            </div>
            <div className='form-group'>
                <button onClick={handleNewCodigo}>Gerar código de cadastro</button>
            </div>
            <div className='form-group'>
                {codeExists && (
                    <>
                        <div className='form-group'>
                            <h1>Já existe um código para esse endereço de email: </h1>
                        </div>
                    </>
                )}
                {showCodigo && (
                    <>
                        <div className='form-group'>
                            <hr className='h-[2px] bg-green border-0 dark:bg-gray-700'></hr>
                            <h1 className='py-[5px]'><b>Email:</b> {email}</h1>
                            <div className="">
                                <p><b>Código de cadastro:</b> {codigo}</p>
                                <button className="flex" onClick={() => {
                                    navigator.clipboard.writeText(codigo);
                                    setShowCopyPopup(true);
                                }}><MdContentCopy size={23} style={{ padding: '2px' }} />Copiar código</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {showCopyPopup && (
                <div className="text-[#00d451] font-medium text-lg">
                    <h1>Código copiado!</h1>
                </div>
            )}
        </div>
    )
}

export default AddPacientes;
