'use client'
import { useState } from 'react';
import ShowAtendimentosPaciente from '@/components/showatendimentospaciente';
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function Consultas() {
  const help = () => {
    Swal.fire({
      title: "Atendimentos",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Aqui você pode ver a lista das consultas que você já teve com seu/sua nutricionista!</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Atendimentos <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
        </div>
        <ShowAtendimentosPaciente />
      </div>
    </main>
  );
}
