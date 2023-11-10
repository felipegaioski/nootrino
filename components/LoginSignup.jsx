import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    const [action, setAction] = useState("Cadastrar");

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Nome' />
            </div>}
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Senha'/>
            </div>
            {action==="Cadastrar"?<div></div>:<div className="forgot-password">Esqueceu a senha? <span>Clique aqui!</span></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={() => {setAction("Cadastrar")}}>Cadastrar</div>
                <div className={action==="Cadastrar"?"submit gray":"submit" } onClick={() => {setAction("Login")}}>Login</div>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup