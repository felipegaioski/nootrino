import Featured from '@/components/featured'
import { PiForkKnifeFill } from 'react-icons/pi'
import { BsChatFill, BsCart } from 'react-icons/bs'
import { BsPersonVcardFill } from 'react-icons/bs'
import { FaHouse, FaCalendar, FaGear } from 'react-icons/fa6'

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        {/* 
        <div className='flex items-center justify-start flex-col gap-[20px] max-w-[350px]'>
          <h4 className='text-blue font-bold text-center'>Seu profissional ainda não disponibilizou nenhum plano alimentar</h4>
          <img src="https://dietbox.azureedge.net/static/Images/noplan.png" alt="" />
          <button className='text-[12px] bg-gray/10 px-[20px] py-[10px] rounded-[5px] text-black/60'>Entre em contato com seu (sua) nutricionista</button>
        </div>
        */}
        <div className='flex gap-[10px] w-full py-[20px] justify-center'>
          <a href="/pacientes" className='bg-blue p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Seus Pacientes</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <BsPersonVcardFill size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Veja e edite as informações e dietas dos seus pacientes</span>
            </div>
          </a>
          <a href="/agenda" className='bg-yellow p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Agendamentos</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <FaCalendar size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Confira sua agenda de atendimentos</span>
            </div>
          </a>
          <a href="#" className='bg-green p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[14px]'>Lista de Compras</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <BsCart size={23} color="white" />
              <span className='text-white text-[12px] max-w-[100px]'>Você possui 0 itens na lista</span>
            </div>
          </a>
        </div>
          <div className='bg-white rounded-[5px] w-full shadow-sm px-[20px] py-[20px] flex flex-col h-[250px]'>
            <span className='text-purple text-[14px]'>Materiais</span>
            <p className='text-[12px] text-gray'>1 material disponível</p>
          </div>
        </div>
        <a href="/">Landingpage</a>
    </main>
  )
}
