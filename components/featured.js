import React from 'react'
import { FaCalendar, FaVideo } from 'react-icons/fa'

export default function Featured() {
    return (
        <aside className='max-w-[250px] flex items-center justify-start flex-col gap-[20px]'>
            <div className='w-full bg-white shadow-md p-[10px] rounded-[5px] flex flex-col gap-[20px]'>
                <h3>Seu (sua) profissional</h3>
                <img className='w-[50px] h-[50px] rounded-full object-cover' src="https://dietbox.blob.core.windows.net/nutritionist/1167192/photo.png?hash=09ce5dc8-e7fa-402d-ab20-8b8aabcc360a" alt="Nutricionista" />
                <div className='flex flex-col'>
                    <span className='text-blue font-bold'>ELISANGELA FERNANDA CHUDOBA</span>
                    <small>nutrielisangelachudoba@gmail.com</small>
                </div>
            </div>
            <div className='w-full bg-white shadow-md p-[10px] rounded-[5px] flex flex-col gap-[20px]'>
                <h3 className='text-[18px]'>Agende sua consulta</h3>
                <button className='flex items-center justify-center gap-[10px] px-[20px] py-[5px] bg-blue rounded-[5px]'>
                    <FaCalendar size={15} color="white" />
                    <span className='text-white text-[12px]'>Marcar nova consulta</span>
                </button>
                <div className='h-[1px] bg-gray/30 w-[90%] mx-auto'></div>
                <div className='flex flex-col'>
                    <span className='text-[12px] font-bold'>Está com alguma dúvida?</span>
                    <span className='text-[12px]'>Acesse a <a className='text-blue' href="#">Central de Ajuda</a></span>
                </div>
            </div>

            <div className='w-full bg-purple shadow-md p-[10px] rounded-[5px] flex flex-col gap-[20px]'>
                <h3 className='text-[18px] text-white'>Videoconferência</h3>
                <div className='flex items-center justify-center gap-[20px]'>
                    <FaVideo size={30} color="white" />
                    <button className='rounded-full px-[20px] py-[8px] bg-white/10 border border-white text-white text-[12px]'>CONECTAR</button>
                </div>
                <div className='h-[1px] bg-gray/30 w-[90%] mx-auto'></div>
                <div className='flex flex-col'>
                    <span className='text-[12px] font-bold'>Está com alguma dúvida?</span>
                    <span className='text-[12px]'>Acesse a <a className='text-blue' href="#">Central de Ajuda</a></span>
                </div>
            </div>
        </aside>
    )
}
