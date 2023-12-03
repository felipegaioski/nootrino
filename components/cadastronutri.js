'use client'
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Select from 'react-select'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Form = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [selectedCrn, setSelectedCrn] = useState(null);
  const [inscricao, setInscricao] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [codigo, setCodigo] = useState('');

  const isEmailValid = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = async () => {

    const codColletctionRef = collection(db, "codigos_nutri")
    const cod_data = await getDocs(codColletctionRef);
    const codigos = cod_data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let codFound = false;

    codigos.map(cod => {
      if (cod.id === codigo) {
        codFound = true;
        return;
      }
    })

    if (codFound) {

      if (!nome || !email || !password || !confirmPassword || !codigo) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (password.length < 8) {
        alert("Sua senha precisa ter no mínimo 8 caracteres");
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

      addDoc(usersColletctionRef, {
        nome: nome, email: email, senha: password, paciente: false, ativo: true,
        crn: selectedCrn.value, inscricao: inscricao, cod_user: cod
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nome', nome);
        localStorage.setItem('cod_user', cod);
      }
      alert("Cadastro realizado com sucesso!");

      const cod_doc = doc(db, "codigos_nutri", codigo);
      const updatedCod = { used: true, cod_nutri: cod };
      await updateDoc(cod_doc, updatedCod);

      push('/home');
    } else {
      alert("Código de cadastro inválido");
    }
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