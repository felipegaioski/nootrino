'use client'
import { useState } from 'react';  // Import useState
import Agendamento from '@/components/agendamento'

export default function Agenda() {
  const [showAgendamento, setShowAgendamento] = useState(false);  // Initialize state

  const handleButtonClick = () => {
    setShowAgendamento(true);  // Set the state to true when the button is clicked
  };

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Agendamentos</h2>
        </div>
        <div className="form-group">
          <button onClick={handleButtonClick}>Novo Agendamento</button>
        </div>
        {showAgendamento && <Agendamento />}  {/* Conditionally render Agendamento */}
        <div className='items-center justify-center flex-col w-full'>
          {/* Your existing code for displaying patient information */}
        </div>
      </div>
    </main>
  );
}
