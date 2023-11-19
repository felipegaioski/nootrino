'use client'
//import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';

const Form = () => {

  //const { register, handleSubmit, formState: { errors } } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const onSubmit = (data) => { console.log(data) };



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
      alert("Wrong Password");
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
          //className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          onChange={(event) => { handleEmail(event) }}
        //{...register('email', {required: true})}
        />
        {/* {errors?.email && <p className="error-message">O email é obrigatório</p>} */}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          // className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          onChange={(event) => { handlePassword(event) }}
        // {...register('password', { required: true, minLength: 7} )}
        />
        {/* {errors?.password?.type === 'minLength' && (
          <p className="error-message">A senha tem pelo menos 7 caracteres</p>
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
        <button onClick={handleChange}>Login</button>
      </div>
    </div>
  );
};
export default Form;