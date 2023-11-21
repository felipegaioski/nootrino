'use client'
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPersonVcardFill } from 'react-icons/bs'
import { FaCalendar } from 'react-icons/fa6'
import { GiShinyApple } from "react-icons/gi";
import { HiPlusSm } from "react-icons/hi";
import { IoDocument } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";

export default function Home() {
  const openPdf = () => {
    // Replace 'path/to/your/file.pdf' with the actual path to your PDF file
    window.open('/lista_substituicao.pdf', '_blank');
  };

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
          <a href="/addpaciente" className='bg-green p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Adicionar Paciente</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <IoPersonAddSharp size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Procure e adicione um novo paciente</span>
            </div>
          </a>
          <a href="/addalimento" className='bg-[#793b9e] p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Criar novo alimento</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <HiPlusSm size={20} color="white" />
              <GiShinyApple size={30} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Crie um novo alimento para adicioná-lo às dietas</span>
            </div>
          </a>
        </div>
        <button onClick={openPdf} className='bg-[#4287f5] p-[10px] rounded-[5px] max-w-[500px]'>
          <h6 className='text-white font-bold text-[20px]'>Lista de substituição dos alimentos</h6>
          <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
            <IoDocument size={30} color="white" />
            <span className='text-white text-[14px] max-w-[300px]'>Veja o pdf com a lista de alimentos</span>
          </div>
        </button>
        <br></br>
        <div class="tooltip"><FaQuestion size={20} />
          <span class="tooltiptext">No final de todas as páginas você verá botão para te ajudar a usar o sistema da Nootrino! Basta passar o mouse por cima!</span>
        </div>
        <br></br>
        <div class="tooltip">Ajuda
          <span class="tooltiptext">A barra do lado esquerdo te acompanhará por onde você for! Você pode acessar rapidamente as páginas
            sem precisar voltar à pagina inicial. Basta clicar no ícone correspondente! Quando quiser sair da Nootrino é só clicar em "Sair" no canto superior direito!</span>
        </div>
      </div>
    </main>
  )
}
