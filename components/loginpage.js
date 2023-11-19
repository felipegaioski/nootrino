'use client'
//import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';

const Form = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleChange = async () => {

    const usersColletctionRef = collection(db, "user")
    const data = await getDocs(usersColletctionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    users.map(user => {
      if (user.email === email) {
        setUser(user);
      }
    })
    console.log(user.paciente);
    if (user.senha === password) {
      if (user.paciente) {
        alert("logado como paciente")
      } else {
        alert("logado como nutricionista")
      }
    } else {
      alert("Senha incorreta");
    }
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
        <button onClick={handleChange}>Login</button>
      </div>
    </div>
  );
};
export default Form;