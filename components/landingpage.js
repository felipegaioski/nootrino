'use client'
import { useState } from 'react';
import Escolhauser from '@/components/escolhauser';

export default function Landingpage() {
  const [showEscolhauser, setShowEscolhauser] = useState(false);

  const handleButtonClick = () => {
    setShowEscolhauser(true);
  };

  return (
    <div className="h-screen w-screen justify-center items-center bg-[#32bb67]">
      <div className="flex justify-items-center items-center flex-col py-[50px]">
        <img src="Nootrino-logo-branco.png" width={600} height={600} alt="Logo"></img>
        <h1 className="text-[#FFFF] text-3xl font-bold">Bem-vindo à Nootrino</h1>
        <br></br>
        <h2 className="text-[#FFFF] text-base">Faça login ou cadastre-se para acessar o sistema</h2>
        <div className="landing">
          {!showEscolhauser && <button onClick={handleButtonClick}>Cadastre-se</button>}
          {showEscolhauser && <Escolhauser />}
        </div>
      </div>
    </div>
  );
}