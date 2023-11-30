'use client'
import { FaCalendar } from 'react-icons/fa6'
import { MdRestaurantMenu } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { IoDocument } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";

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

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <br></br>
        <div className='flex items-center justify-start flex-col gap-[20px]'>
          <h4 className='text-blue font-bold text-center'>{phrase}</h4>
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
        <div className='flex items-center text-center form-group'>
          <h1 className='text-[green]'><b>Lembre-se de beber água!</b></h1>
          <p>Você sabia que a recomendação é beber ao menos dois litros de água por dia? Não espere sentir sede!</p>
          <br></br>
          <div className='flex'><IoIosWater size={30} color="#4287f5" /></div>
        </div>
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
