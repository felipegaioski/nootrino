'use client'
import { FaCalendar } from 'react-icons/fa6'
import { MdRestaurantMenu } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { IoDocument } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function HomePaciente() {
  let nome_nutri;
  if (typeof window !== 'undefined') {
    nome_nutri = localStorage.getItem('nome_nutri');
  }
  let phrase = "";
  if (!nome_nutri) {
    phrase = "Ainda não há um(a) nutricionista para você."
  } else {
    phrase = "Seu / sua nutricionista: " + nome_nutri;
  }

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
      <p>Bem vindo(a)! Esta é sua página inicial. Aqui você pode acessar as funcionalidades da Nootrino.
      <br> Ao lado esquerdo você encontrará ícones que também levarão você às páginas.
      <br> Para fazer log out, basta clicar em sair!</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <br></br>
        <div className='flex items-center justify-start flex-col gap-[20px]'>
          <h4 className='text-blue text-xl font-bold text-center'>{phrase} <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h4>
        </div>

        <div className='flex gap-[10px] w-full py-[20px] justify-center'>
          <a href="/planoalimentar" className='bg-blue p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Seu Plano Alimentar</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <MdRestaurantMenu size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Confira sua dieta semanal</span>
            </div>
          </a>
          <a href="/consultas" className='bg-yellow p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Consultas</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <FaCalendar size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Confira suas consultas</span>
            </div>
          </a>
          <a href="/medidaspaciente" className='bg-green p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[30px]'>Medidas Corporais</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <GiBodyHeight size={23} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Veja seu histórico de medidas corporais</span>
            </div>
          </a>
          <button onClick={openPdf} className='bg-purple p-[10px] rounded-[5px] w-full'>
            <h6 className='text-white font-bold text-[20px]'>Lista de substituição dos alimentos</h6>
            <div className='flex items-center justify-start py-[20px] px-[10px] gap-[10px]'>
              <IoDocument size={60} color="white" />
              <span className='text-white text-[14px] max-w-[300px]'>Veja o pdf com a lista de alimentos que você pode substituir na sua dieta (lembre-se de manter as porções!)</span>
            </div>
          </button>
        </div>
        <div className='flex items-center text-center aviso form-group'>
          <h1 className='text-[green] text-xl font-semibold'><b>Lembre-se de beber água!</b></h1>
          <br></br>
          <p className='font-semibold'>Você sabia que a recomendação é beber ao menos dois litros de água por dia? Não espere sentir sede!</p>
          <br></br>
          <div className='flex'><IoIosWater size={30} color="#4287f5" /></div>
        </div>
        <br></br>
        <br></br>
      </div>
    </main>
  )
}
