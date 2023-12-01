'use client'
//import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Form = () => {

  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async () => {
    const usersCollectionRef = collection(db, "user");
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    let foundUser = null;

    users.forEach((u) => {
      if (u.email === email) {
        foundUser = u;
      }
    });

    if (foundUser) {
      setUser(foundUser);

      if (foundUser.senha === password) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cod_user', foundUser.cod_user);
          localStorage.setItem('nome', foundUser.nome);
        };
        if (foundUser.paciente) {
          if (foundUser.cod_nutri != null) {
            users.forEach((u) => {
              if (u.cod_user == foundUser.cod_nutri) {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('nome_nutri', u.nome);
                }
              }
            });
          }
          //alert("Logado como paciente");
          push('/homepaciente');
        } else {
          //alert("Logado como nutricionista");
          push('/home');
        }
      } else {
        alert("Senha incorreta");
      }
    } else {
      alert("Usuário não encontrado");
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="app-container">
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
          <button className="text-xs max-w-[100px]" onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash color={"black"} /> : <FaRegEye color={"black"} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <button onClick={handleChange}>Login</button>
      </div>
    </div>
  );
};
export default Form;