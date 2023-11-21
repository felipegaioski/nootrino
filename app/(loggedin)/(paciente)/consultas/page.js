'use client'
import { useState } from 'react';
import ShowAtendimentosPaciente from '@/components/showatendimentospaciente';

export default function Consultas() {

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Atendimentos</h2>
        </div>
        <ShowAtendimentosPaciente />
        <div class="tooltip">Ajuda
          <span class="tooltiptext">Aqui você pode visualizar as consultas agendadas com seu / sua nutricionista. As consultas já realizadas também estarão aqui!</span>
        </div>
      </div>
    </main>
  );
}
