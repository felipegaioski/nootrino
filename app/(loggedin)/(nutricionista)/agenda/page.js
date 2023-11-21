'use client'
import { useState } from 'react';  // Import useState
import Agendamento from '@/components/agendamento'

export default function Agenda() {

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Agendamentos</h2>
        </div>
        <Agendamento />
        <div className='flex pb-[200px]'>
          <div class="tooltip">Ajuda
            <span class="tooltiptext">Aqui você vai ver todos os seus agendamentos com os pacientes. Para criar um agendamento basta clicar em "Novo Agendamento",
              selecionar o paciente e preencher. IMPORTANTE: Você não pode selecionar uma data anterior ao dia de hoje! Certifique-se de escolher uma data futura.
              Se quiser excluir um atendimento, é só clicar no botão "Excluir" ABAIXO de cada agendamento.</span>
          </div>
        </div>
        <br></br>
      </div>
    </main>
  );
}
