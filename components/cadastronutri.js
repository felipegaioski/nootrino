'use client'
//import { useForm } from "react-hook-form";

import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Select from 'react-select'

const Form = () => {
  const { push } = useRouter();

  //const { register, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [selectedCrn, setSelectedCrn] = useState(null);
  const [inscricao, setInscricao] = useState(null);

  const handleChange = async () => {

    const usersColletctionRef = collection(db, "user")
    const data = await getDocs(usersColletctionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    users.map(user => {
      if (user.email === email) {
        alert("O endereço de email já existe!");
        return;
      }
    })
    addDoc(usersColletctionRef, {
      nome: nome, email: email, senha: password, paciente: false, ativo: true,
      crn: selectedCrn.value, inscricao: inscricao, cod_user: Math.floor(Math.random() * 1000) + 1
    });
    alert("Cadastro realizado com sucesso!");
    push('/home');
  }

  const handleNome = (event) => {
    setNome(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleCrnChange = (selectedOption) => {
    setSelectedCrn(selectedOption);
  };

  const handleInscricao = (event) => {
    setInscricao(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          placeholder="Nome completo"
          onChange={(event) => { handleNome(event) }}
        />
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Seu e-mail"
          onChange={(event) => { handleEmail(event) }}
        />
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          type="password"
          placeholder="Senha"
          onChange={(event) => { handlePassword(event) }}
        />
      </div>

      <div className="form-group">
        <label>CRN</label>
        <Select
          value={selectedCrn}
          onChange={handleCrnChange}
          options={[
            { value: '1', label: 'CRN 1' },
            { value: '2', label: 'CRN 2' },
            { value: '3', label: 'CRN 3' },
            { value: '4', label: 'CRN 4' },
            { value: '5', label: 'CRN 5' },
            { value: '6', label: 'CRN 6' },
            { value: '7', label: 'CRN 7' },
            { value: '8', label: 'CRN 8' },
            { value: '9', label: 'CRN 9' },
            { value: '10', label: 'CRN 10' },
            { value: '11', label: 'CRN 11' },
            { value: '12', label: 'CRN 12' }
          ]}
          isSearchable
        />
        <br></br>
        <label>Inscrição</label>
        <input
          type="text"
          placeholder="Inscrição"
          onChange={(event) => { handleInscricao(event) }}
        />
      </div>

      <div className="form-group">
        <button onClick={handleChange}>Criar conta</button>
      </div>
    </div >
  );
};

export default Form;