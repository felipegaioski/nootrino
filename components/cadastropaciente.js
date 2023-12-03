'use client'
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Form = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [codigo, setCodigo] = useState('');

  const isEmailValid = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = async () => {

    if (!nome || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, insira senhas iguais.");
      return;
    }

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('nome', nome);
      localStorage.setItem('cod_user', cod);
    }
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

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleCodigo = (event) => {
    setCodigo(event.target.value);
  }

  return (
    <div className="app-container">

      <div className="form-group">
        <label>Código de cadastro</label>
        <input
          type="text"
          placeholder="Código de cadastro"
          onChange={(event) => { handleCodigo(event) }}
        />
      </div>

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
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={password}
          onChange={(event) => { handlePassword(event) }}
        />
        <div className='items-end'>
          <button className="text-xs max-w-[100px]" type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash color={"black"} /> : <FaRegEye color={"black"} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Confirmar Senha</label>
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(event) => { handleConfirmPassword(event) }}
        />
      </div>

      <div className="form-group">
        <button onClick={handleChange}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;