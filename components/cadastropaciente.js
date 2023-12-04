'use client'
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
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
  const [valid, setValid] = useState(null);
  const [codeUsed, setCodeUsed] = useState(false);
  const [codNutri, setCodNutri] = useState(null);
  const [nomeNutri, setNomeNutri] = useState('');

  let foundCode = false;
  const checkCode = async () => {
    setCodeUsed(false);

    if (email && codigo) {
      if (!isEmailValid(email)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
      }
      const codCollectionRef = collection(db, "codigos_paciente")
      const data = await getDocs(codCollectionRef);
      const codigos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      codigos.map(cod => {
        if (cod.id === codigo && cod.email === email) {
          if (cod.used === true) {
            setCodeUsed(true);
            return;
          }
          foundCode = true;
          setCodNutri(cod.cod_nutri);
          setNomeNutri(cod.nome_nutri);
          setValid(true);
          return;
        }
      })

      if (!foundCode) {
        setValid(false);
      }

    } else {
      setValid(false);
    }
  }

  const isEmailValid = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = async () => {

    if (!nome || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, insira senhas iguais.");
      return;
    }

    const usersCollectionRef = collection(db, "user")
    const data = await getDocs(usersCollectionRef);
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

    const cod_doc = doc(db, 'codigos_paciente', codigo);
    addDoc(usersCollectionRef, { nome: nome, email: email, senha: password, paciente: true, ativo: true, cod_user: cod, cod_nutri: codNutri });
    if (typeof window !== 'undefined') {
      localStorage.setItem('nome', nome);
      localStorage.setItem('cod_user', cod);
      localStorage.setItem('nome_nutri', nomeNutri);
      localStorage.setItem('cod_nutri', codNutri);
    }
    await updateDoc(cod_doc, { used: true });
    //alert("Cadastro realizado com sucesso!");
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
          disabled={valid}
        />
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Seu e-mail"
          onChange={(event) => { handleEmail(event) }}
          disabled={valid}
        />
      </div>

      <div className="form-group">
        {!valid && <button onClick={checkCode}>Verificar código</button>}
        <br></br>
        {valid === true && <h1 class='text-[#00d451]'>Código verificado!</h1>}
        {valid === false && <h1 class='text-[#ff0000]'>Código ou email inválidos!</h1>}
        {codeUsed && <h1 class='text-[#ff0000]'>Código já usado!</h1>}
      </div>

      {valid && (
        <>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome completo"
              onChange={(event) => { handleNome(event) }}
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
        </>
      )}
    </div>
  );
};

export default Form;