'use client'
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPersonVcardFill } from 'react-icons/bs'
import { FaCalendar } from 'react-icons/fa6'
import { GiShinyApple } from "react-icons/gi";
import { HiPlusSm } from "react-icons/hi";
import { IoDocument } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function Home() {
  const openPdf = () => {
    window.open('/lista_substituicao.pdf', '_blank');
  };

  const help = () => {
    Swal.fire({
      title: "Página inicial",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Bem vindo(a), nutricionista! Esta é a sua página inicial! Acesse facilmente todas as funcionalidades da Nootrino!
      <br> Ao lado esquerdo você encontrará ícones que também levarão você às páginas.
      <br> Para fazer log out, basta clicar em sair!</p>
      </div>`
    });
  }

  let nome;
  if (typeof window !== 'undefined') {
    nome = localStorage.getItem('nome');
  }

  return (
    <main>
      <div className='items-center justify-start flex-col w-full flex-1 text-[20px] gap-[10px] font-bold ml-[80px] pt-[80px] px-[20px]'>
        <h2 className='h2-title'>Bem vindo(a), {nome}!  <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
      </div>
      <div className='ml-[80px] flex gap-[20px] px-[20px]'>
        <div className='flex items-center justify-start flex-col w-full flex-1'>
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
                <span className='text-white text-[14px] max-w-[300px]'>Gere um código de cadastro para um novo paciente</span>
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
        </div>
      </div>
    </main>
  )
}
