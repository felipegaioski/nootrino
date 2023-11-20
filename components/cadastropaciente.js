'use client'
//import { useForm } from "react-hook-form";

import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Form = () => {
  const { push } = useRouter();

  //const { register, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const handleChange = async () => {

    const usersColletctionRef = collection(db, "user")
    const data = await getDocs(usersColletctionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    //gerar código
    let cod;
    let unique = false;
    function generateCode() {
      cod = Math.floor(Math.random() * 1000) + 1;
    }

    // verificar se já existe
    function verifyCod() {
      users.map(user => {
        if (user.cod_user === cod) {
          //generateCode();
          console.log("Re-gerando código");
          return false;
        }
      })
      return true;
    }

    users.map(user => {
      if (user.email === email) {
        alert("O endereço de email já existe!");
        return;
      }
    })

    while (unique === false) {
      // gerar código do usuário
      generateCode();
      unique = verifyCod();
    };

    addDoc(usersColletctionRef, { nome: nome, email: email, senha: password, paciente: true, ativo: true, cod_user: cod });
    localStorage.setItem('nome', nome);
    localStorage.setItem('cod_user', cod);
    alert("Cadastro realizado com sucesso!");
    push('/homepaciente');
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

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          //className={errors?.name && "input-error"}
          type="text"
          placeholder="Nome completo"
          onChange={(event) => { handleNome(event) }}
        //{...register('name', { required: true })}
        />
        {/* {errors?.name?.type === 'required' && <p className="error-message">O nome é obrigatório</p>} */}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          //className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          onChange={(event) => { handleEmail(event) }}
        //{...register('email', { required: true })}
        />
        {/* {errors?.email && <p className="error-message">O email é obrigatório</p>} */}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          //className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          onChange={(event) => { handlePassword(event) }}
        //{...register('password', { required: true, minLength: 7 })}
        />
        {/* {errors?.password?.type === 'minLength' && (
          <p className="error-message">A senha deve conter pelo menos 7 caracteres</p>
        )}
        {errors?.password?.type === 'required' && (
          <p className="error-message">A senha é obrigatória</p>
        )} */}
      </div>

      {/*
      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register('privacyTerms')}
          />
          <label>Eu concordo com os termos de privacidade.</label>
        </div>

        {/* {errors?.privacyTerms && (
          <p className="error-message">{errors?.privacyTerms}</p>
        )} 
      </div>
        */}

      <div className="form-group">
        <button onClick={handleChange}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;